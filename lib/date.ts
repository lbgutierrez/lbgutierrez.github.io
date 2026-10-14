import { parseISO, format } from 'date-fns'
import { es } from 'date-fns/locale'

/**
 * Recibe una fecha ISO (YYYY-MM-DD) y devuelve MM.dd.YY
 */
export function formatDate(dateString: string): string {
  const date = parseISO(dateString)
  return format(date, 'MM.dd.yy')  // ojo: 'yy' es año en 2 dígitos
}

/**
 * Formatea "2025-07-18" como "sáb. 18 de julio de 2015"
 */
export function formatDateVerboseES(dateString: string): string {
  const date = parseISO(dateString)
  // 'EEE' = abreviatura día (sáb), 
  // "d 'de' MMMM 'de' yyyy" = 18 de julio de 2015
  return format(date, "EEE'.' d 'de' MMMM 'de' yyyy", { locale: es })
}