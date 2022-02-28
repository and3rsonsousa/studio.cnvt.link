This is [Remix](https://remix.run) running on Cloudflare [Pages](https://pages.cloudflare.com), with [Tailwind CSS](https://tailwindcss.com) and [Supabase](https://supabase.com).

## Supabase

Supabase has a patch in order to work with Pages.

```
"exports": {
  "default": "./dist/umd/supabase.js"
}
```

## Tailwind CSS

Tailwind is configured with `@tailwind/forms` and `prettier-plugin-tailwindcss` to auto sorte class names.
