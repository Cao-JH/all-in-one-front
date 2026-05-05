import request from '@/utils/request'
import type { BookItem } from '@/types/book'

export const searchBook = (params: { keyword: string }) => {
  return request<BookItem[]>({
    url: '/book-source-parser/search',
    method: 'get',
    params,
  })
}

export const fetchBook = () => {
  return {}
  // return request<BookItem[]>({
  //   url: '/book-source-parser/search',
  //   method: 'get',
  //   params,
  // })
}

export const fetchChapterContent = (params: { bookId: string | number; chapterId: string | number; bookUrl?: string }) => {
  return request<string>({
    url: '/book-source-parser/content',
    method: 'get',
    params,
    // 原始文本，不经过 JSON 自动解析
    transformResponse: [(data) => data],
  }) as unknown as string
}


export async function streamSearchBooks(
  params: { keyword: string },
  onResult: (items: BookItem[]) => void,
  signal?: AbortSignal,
) {
  const url = createSearchUrl('/book-source-parser/search', params)
  const response = await fetch(url, {
    method: 'GET',
    signal,
    headers: {
      Accept: 'application/json, text/event-stream, application/x-ndjson, text/plain',
    },
  })

  if (!response.ok) {
    throw new Error(`Search failed: ${response.status}`)
  }

  if (!response.body) {
    const payload = await response.json()
    onResult(extractSearchItems(payload))
    return
  }

  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''

  while (true) {
    const { done, value } = await reader.read()

    if (done) break

    buffer += decoder.decode(value, { stream: true })
    const lines = buffer.split(/\r?\n/)
    buffer = lines.pop() || ''

    for (const line of lines) {
      const items = parseSearchLine(line)
      if (items.length > 0) {
        onResult(items)
      }
    }
  }

  buffer += decoder.decode()

  if (buffer.trim()) {
    const items = parseSearchLine(buffer)
    if (items.length > 0) {
      onResult(items)
    }
  }
}

function createSearchUrl(path: string, params: Record<string, string>) {
  const baseURL = import.meta.env.VITE_API_BASE_URL || ''
  const origin = typeof window === 'undefined' ? 'http://localhost' : window.location.origin
  const url = new URL(`${baseURL}${path}`, origin)

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value)
  })

  return url.toString()
}

function parseSearchLine(line: string) {
  const content = line.trim()

  if (!content || content === 'data: [DONE]') {
    return []
  }

  const jsonText = content.startsWith('data:') ? content.slice(5).trim() : content

  try {
    return extractSearchItems(JSON.parse(jsonText))
  } catch {
    return []
  }
}

function extractSearchItems(payload: unknown): BookItem[] {
  if (Array.isArray(payload)) {
    return payload.filter(isBookItem)
  }

  if (!isRecord(payload)) {
    return []
  }

  const data = payload.data ?? payload.result ?? payload.results ?? payload.list

  if (Array.isArray(data)) {
    return data.filter(isBookItem)
  }

  if (isBookItem(data)) {
    return [data]
  }

  if (isBookItem(payload)) {
    return [payload]
  }

  return []
}

function isBookItem(value: unknown): value is BookItem {
  return isRecord(value)
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}
