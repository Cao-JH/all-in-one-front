import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'

export const primeVuePreset = definePreset(Aura, {
  semantic: {
    primary: {
      0: '#ffffff',
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
      950: '#030712',
    },
    colorScheme: {
      // 浅色模式 - Surface: Slate
      light: {
        primary: {
          color: '{surface.0}',
          background: '{surface.0}',
          contrastColor: '#ffffff',
          hoverColor: '{primary.700}',
          activeColor: '{surface.900}',
        },
        menuItem: {
          hoverColor: '{surface.950}',
          hoverBackground: '{surface.100}',
        },
        highlight: {
          background: '{primary.50}',
          focusBackground: '{primary.100}',
          color: '{primary.700}',
          focusColor: '{primary.800}',
        },
        surface: {
          0: '#ffffff',
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        text: {
          color: '{surface.900}',
          hoverColor: '{surface.950}',
          mutedColor: '{surface.600}',
          hoverMutedColor: '{surface.700}',
        },
        content: {
          background: '{surface.0}',
          hoverBackground: '{surface.50}',
          borderColor: '{surface.200}',
          color: '{surface.900}',
          hoverColor: '{surface.950}',
        },
        formField: {
          background: '{surface.0}',
          disabledBackground: '{surface.100}',
          filledBackground: '{surface.50}',
          filledHoverBackground: '{surface.100}',
          filledFocusBackground: '{surface.0}',
          borderColor: '{surface.300}',
          hoverBorderColor: '{surface.400}',
          focusBorderColor: '{surface.900}',
          invalidBorderColor: '#ef4444',
          color: '{surface.950}',
          disabledColor: '{surface.400}',
          placeholderColor: '{surface.500}',
          invalidPlaceholderColor: '#ef4444',
          floatLabelColor: '{surface.500}',
          floatLabelFocusColor: '{primary.600}',
          floatLabelActiveColor: '{surface.600}',
          floatLabelInvalidColor: '#ef4444',
          iconColor: '{surface.500}',
          shadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        },
        overlay: {
          select: {
            background: '{surface.50}',
            borderColor: '{surface.200}',
            color: '{surface.200}',
          },
          popover: {
            background: '{surface.50}',
            borderColor: '{surface.200}',
            color: '{surface.200}',
          },
          modal: {
            background: '{surface.0}',
            borderColor: '{surface.200}',
            color: '{surface.950}',
          },
        },
        list: {
          option: {
            focusBackground: '{surface.100}',
            selectedBackground: '{surface.200}',
            selectedFocusBackground: '{surface.200}',
            color: '{surface.300}',
            focusColor: '{surface.200}',
            selectedColor: '{surface.950}',
            selectedFocusColor: '{surface.950}',
          },
          optionGroup: {
            background: 'transparent',
            color: '{surface.400}',
          },
        },
        navigation: {
          item: {
            focusBackground: '{surface.100}',
            activeBackground: '{surface.100}',
            color: '{surface.300}',
            focusColor: '{surface.200}',
            activeColor: '{surface.200}',
          },
          submenuLabel: {
            background: 'transparent',
            color: '{surface.400}',
          },
        },
        mask: {
          background: 'rgba(0,0,0,0.6)',
          color: '{surface.200}',
        },
      },
      // 深色模式 - Surface: Slate
      dark: {
        primary: {
          color: '{surface.0}',
          background: '{surface.0}',
          contrastColor: '#ffffff',
          hoverColor: '{primary.300}',
          activeColor: '{surface.900}',
        },
        menuItem: {
          hoverColor: '{surface.950}',
          hoverBackground: '{surface.100}',
        },
        highlight: {
          background: '{primary.950}',
          focusBackground: '{primary.900}',
          color: '{primary.400}',
          focusColor: '{primary.300}',
        },
        surface: {
          0: '#020617',
          50: '#0f172a',
          100: '#1e293b',
          200: '#334155',
          300: '#475569',
          400: '#64748b',
          500: '#94a3b8',
          600: '#cbd5e1',
          700: '#e2e8f0',
          800: '#f1f5f9',
          900: '#f8fafc',
          950: '#ffffff',
        },
        text: {
          color: '{surface.200}',
          hoverColor: '{surface.100}',
          mutedColor: '{surface.400}',
          hoverMutedColor: '{surface.300}',
        },
        content: {
          background: '{surface.50}',
          hoverBackground: '{surface.100}',
          borderColor: '{surface.200}',
          color: '{surface.200}',
          hoverColor: '{surface.100}',
        },
        formField: {
          background: '{surface.0}',
          disabledBackground: '{surface.100}',
          filledBackground: '{surface.100}',
          filledHoverBackground: '{surface.200}',
          filledFocusBackground: '{surface.50}',
          borderColor: '{surface.300}',
          hoverBorderColor: '{surface.400}',
          focusBorderColor: '{surface.900}',
          invalidBorderColor: '#ef4444',
          color: '{surface.950}',
          disabledColor: '{surface.500}',
          placeholderColor: '{surface.400}',
          invalidPlaceholderColor: '#ef4444',
          floatLabelColor: '{surface.400}',
          floatLabelFocusColor: '{primary.400}',
          floatLabelActiveColor: '{surface.300}',
          floatLabelInvalidColor: '#ef4444',
          iconColor: '{surface.400}',
          shadow: '0 1px 2px 0 rgb(0 0 0 / 0.3)',
        },
        overlay: {
          select: {
            background: '{surface.50}',
            borderColor: '{surface.200}',
            color: '{surface.200}',
          },
          popover: {
            background: '{surface.50}',
            borderColor: '{surface.200}',
            color: '{surface.200}',
          },
          modal: {
            background: '{surface.0}',
            borderColor: '{surface.200}',
            color: '{surface.950}',
          },
        },
        list: {
          option: {
            focusBackground: '{surface.100}',
            selectedBackground: '{surface.200}',
            selectedFocusBackground: '{surface.200}',
            color: '{surface.300}',
            focusColor: '{surface.200}',
            selectedColor: '{surface.950}',
            selectedFocusColor: '{surface.950}',
          },
          optionGroup: {
            background: 'transparent',
            color: '{surface.400}',
          },
        },
        navigation: {
          item: {
            focusBackground: '{surface.100}',
            activeBackground: '{surface.100}',
            color: '{surface.300}',
            focusColor: '{surface.200}',
            activeColor: '{surface.200}',
          },
          submenuLabel: {
            background: 'transparent',
            color: '{surface.400}',
          },
        },
        mask: {
          background: 'rgba(0,0,0,0.6)',
          color: '{surface.200}',
        },
      },
    },
  },
  components: {
    button: {
      colorScheme: {
        light: {
          root: {
            primary: {
              color: '{surface.0}',
              background: '{surface.950}',
              borderColor: '{surface.950}',
            },
            secondary: {
              background: '{surface.100}',
              hoverBackground: '{surface.200}',
              borderColor: '{surface.100}',
              hoverBorderColor: '{surface.200}',
              color: '{surface.600}',
              hoverColor: '{surface.950}',
            },
          },
          outlined: {
            primary: {
              hoverBackground: '{surface.50}',
              borderColor: '{surface.300}',
              color: '{surface.900}',
            },
          },
        },
        dark: {
          root: {
            primary: {
              color: '{surface.0}',
              background: '{surface.950}',
              borderColor: '{surface.950}',
            },
            secondary: {
              background: '{surface.100}',
              hoverBackground: '{surface.200}',
              borderColor: '{surface.100}',
              hoverBorderColor: '{surface.200}',
              color: '{surface.600}',
              hoverColor: '{surface.950}',
            },
          },
          outlined: {
            primary: {
              hoverBackground: '{surface.50}',
              borderColor: '{surface.300}',
              color: '{surface.900}',
            },
          },
        },
      },
    },
    togglebutton: {
      colorScheme: {
        light: {
          root: {
            color: '{surface.500}',
            hoverColor: '{surface.600}',
            background: '{surface.100}',
            hoverBackground: '{surface.100}',
            borderColor: '{surface.100}',
            checkedColor: '{surface.950}',
            checkedBackground: '{surface.100}',
            checkedBorderColor: '{surface.100}',
          },
          content: {
            checkedBackground: '{surface.0}',
          },
        },
        dark: {
          root: {
            color: '{surface.500}',
            hoverColor: '{surface.600}',
            background: '{surface.100}',
            hoverBackground: '{surface.100}',
            borderColor: '{surface.100}',
            checkedColor: '{surface.950}',
            checkedBackground: '{surface.100}',
            checkedBorderColor: '{surface.100}',
          },
          content: {
            checkedBackground: '{surface.50}',
          },
        },
      },
    },
    tooltip: {
      root: {
        padding: '0.325rem 0.625rem',
        maxWidth: '10rem',
        borderRadius: '0.25rem',
      },
    },
  },
})
