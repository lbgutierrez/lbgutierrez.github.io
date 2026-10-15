# Páginas desactivadas

Estas rutas están fuera de `pages/` para que no se publiquen mientras no tengan contenido:

- `archive/` → /archive/ (Escritos)
- `posts/` → /posts/… (cada escrito)
- `biografia.tsx` → /biografia/ (Biografía)

Para reactivar una, muévela de vuelta a `pages/` (misma ruta) y quita el `//` de su
línea en `NAV` dentro de `components/Header.tsx`. El contenido sigue en `posts/` y
`content/biografia.md`.
