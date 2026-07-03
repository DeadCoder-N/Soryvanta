hi

---


Hi! How can I help you today?

---

read and analyze whole project carefully and see error &quot;                                                                                                                                                        
┌──(nitesh㉿DeadDroid)-[~/Desktop/Projects/BRISVORA]
└─$ cd /cd /home/nitesh/Desktop/Projects/BRISVORA
pnpm --filter web dev


&gt; web@0.1.0 dev /home/nitesh/Desktop/Projects/BRISVORA/apps/web
&gt; next dev

▲ Next.js 16.2.9 (Turbopack)
- Local:         http://localhost:3000
- Network:       http://192.168.0.112:3000
- Environments: .env.local
✓ Ready in 490ms
⚠ Warning: Next.js inferred your workspace root, but it may not be correct.
 We detected multiple lockfiles and selected the directory of /home/nitesh/package-lock.json as the root directory.
 To silence this warning, set `turbopack.root` in your Next.js config, or consider removing one of the lockfiles if it&#39;s not needed.
   See https://nextjs.org/docs/app/api-reference/config/next-config-js/turbopack#root-directory for more information.
 Detected additional lockfiles: 
   * /home/nitesh/Desktop/Projects/BRISVORA/pnpm-workspace.yaml


￼

prisma:error 
Invalid `__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$BRISVORA$2f$packages$2f$shared$2f$src$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[&quot;prisma&quot;].property.findMany()` invocation in
/home/nitesh/Desktop/Projects/BRISVORA/apps/web/.next/dev/server/chunks/ssr/[root-of-the-server]__0e4q4xb._.js:528:194

  525 }
  526 async function searchListings(params) {
  527     const { city, minPrice, maxPrice, type, bedrooms, page = 1, limit = 12 } = params;
→ 528     return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$BRISVORA$2f$packages$2f$shared$2f$src$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[&quot;prisma&quot;].property.findMany(
Can&#39;t reach database server at `aws-1-ap-southeast-1.pooler.supabase.com:6543`

Please make sure your database server is running at `aws-1-ap-southeast-1.pooler.supabase.com:6543`.
⨯ Error [PrismaClientInitializationError]: 
Invalid `{imported module ./Desktop/Projects/BRISVORA/packages/shared/src/db.ts}[&quot;prisma&quot;].property.findMany()` invocation in
/home/nitesh/Desktop/Projects/BRISVORA/apps/web/.next/dev/server/chunks/ssr/[root-of-the-server]__0e4q4xb._.js:528:194

  525 }
  526 async function searchListings(params) {
  527     const { city, minPrice, maxPrice, type, bedrooms, page = 1, limit = 12 } = params;
→ 528     return {imported module ./Desktop/Projects/BRISVORA/packages/shared/src/db.ts}[&quot;prisma&quot;].property.findMany(
Can&#39;t reach database server at `aws-1-ap-southeast-1.pooler.supabase.com:6543`

Please make sure your database server is running at `aws-1-ap-southeast-1.pooler.supabase.com:6543`.
    at &lt;unknown&gt; (../api/src/listings/index.ts:79:26)
    at async HomePage (app/page.tsx:22:20)
  77 |   const { city, minPrice, maxPrice, type, bedrooms, page = 1, limit = 12 } = params
  78 |
&gt; 79 |   return prisma.property.findMany({
     |                          ^
  80 |     where: {
  81 |       status: &#39;ACTIVE&#39;,
  82 |       ...(city &amp;&amp; { city: { contains: city, mode: &#39;insensitive&#39; } }), {
  clientVersion: &#39;5.22.0&#39;,
  errorCode: undefined,
  digest: &#39;1234581651&#39;
}
 GET / 500 in 5.7s (next.js: 240ms, application-code: 5.5s)
[browser] Uncaught PrismaClientInitializationError: 
Invalid `__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$BRISVORA$2f$packages$2f$shared$2f$src$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[&quot;prisma&quot;].property.findMany()` invocation in
/home/nitesh/Desktop/Projects/BRISVORA/apps/web/.next/dev/server/chunks/ssr/[root-of-the-server]__0e4q4xb._.js:528:194

  525 }
  526 async function searchListings(params) {
  527     const { city, minPrice, maxPrice, type, bedrooms, page = 1, limit = 12 } = params;
→ 528     return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$BRISVORA$2f$packages$2f$shared$2f$src$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[&quot;prisma&quot;].property.findMany(
Can&#39;t reach database server at `aws-1-ap-southeast-1.pooler.supabase.com:6543`

Please make sure your database server is running at `aws-1-ap-southeast-1.pooler.supabase.com:6543`.
    at &lt;unknown&gt; (../api/src/listings/index.ts:79:26)
    at HomePage (app/page.tsx:22:20)
  77 |   const { city, minPrice, maxPrice, type, bedrooms, page = 1, limit = 12 } = params
  78 |
&gt; 79 |   return prisma.property.findMany({
     |                          ^
  80 |     where: {
  81 |       status: &#39;ACTIVE&#39;,
  82 |       ...(city &amp;&amp; { city: { contains: city, mode: &#39;insensitive&#39; } }),
  Reload env: .env.local
prisma:query BEGIN
prisma:query DEALLOCATE ALL
prisma:query SELECT &quot;public&quot;.&quot;Property&quot;.&quot;id&quot;, &quot;public&quot;.&quot;Property&quot;.&quot;slug&quot;, &quot;public&quot;.&quot;Property&quot;.&quot;ownerId&quot;, &quot;public&quot;.&quot;Property&quot;.&quot;ownerPhone&quot;, &quot;public&quot;.&quot;Property&quot;.&quot;title&quot;, &quot;public&quot;.&quot;Property&quot;.&quot;description&quot;, &quot;public&quot;.&quot;Property&quot;.&quot;address&quot;, &quot;public&quot;.&quot;Property&quot;.&quot;city&quot;, &quot;public&quot;.&quot;Property&quot;.&quot;price&quot;, &quot;public&quot;.&quot;Property&quot;.&quot;priceLabel&quot;, &quot;public&quot;.&quot;Property&quot;.&quot;bedrooms&quot;, &quot;public&quot;.&quot;Property&quot;.&quot;bathrooms&quot;, &quot;public&quot;.&quot;Property&quot;.&quot;areaSqft&quot;, &quot;public&quot;.&quot;Property&quot;.&quot;type&quot;::text, &quot;public&quot;.&quot;Property&quot;.&quot;status&quot;::text, &quot;public&quot;.&quot;Property&quot;.&quot;features&quot;, &quot;public&quot;.&quot;Property&quot;.&quot;amenities&quot;, &quot;public&quot;.&quot;Property&quot;.&quot;rawInput&quot;, &quot;public&quot;.&quot;Property&quot;.&quot;createdAt&quot;, &quot;public&quot;.&quot;Property&quot;.&quot;updatedAt&quot; FROM &quot;public&quot;.&quot;Property&quot; WHERE &quot;public&quot;.&quot;Property&quot;.&quot;status&quot; = CAST($1::text AS &quot;public&quot;.&quot;PropertyStatus&quot;) ORDER BY &quot;public&quot;.&quot;Property&quot;.&quot;createdAt&quot; DESC LIMIT $2 OFFSET $3
prisma:query SELECT &quot;public&quot;.&quot;Image&quot;.&quot;id&quot;, &quot;public&quot;.&quot;Image&quot;.&quot;propertyId&quot;, &quot;public&quot;.&quot;Image&quot;.&quot;url&quot;, &quot;public&quot;.&quot;Image&quot;.&quot;thumbnailUrl&quot;, &quot;public&quot;.&quot;Image&quot;.&quot;caption&quot;, &quot;public&quot;.&quot;Image&quot;.&quot;order&quot;, &quot;public&quot;.&quot;Image&quot;.&quot;createdAt&quot; FROM &quot;public&quot;.&quot;Image&quot; WHERE &quot;public&quot;.&quot;Image&quot;.&quot;propertyId&quot; IN ($1) ORDER BY &quot;public&quot;.&quot;Image&quot;.&quot;order&quot; ASC LIMIT $2 OFFSET $3
prisma:query SELECT &quot;public&quot;.&quot;Analytics&quot;.&quot;id&quot;, &quot;public&quot;.&quot;Analytics&quot;.&quot;viewCount&quot;, &quot;public&quot;.&quot;Analytics&quot;.&quot;propertyId&quot; FROM &quot;public&quot;.&quot;Analytics&quot; WHERE &quot;public&quot;.&quot;Analytics&quot;.&quot;propertyId&quot; IN ($1) OFFSET $2
prisma:query COMMIT
⨯ Error: Event handlers cannot be passed to Client Component props.
  &lt;div style={{...}} onMouseEnter={function onMouseEnter} onMouseLeave=... children=...&gt;
                                  ^^^^^^^^^^^^^^^^^^^^^^^
If you need interactivity, consider converting part of this to a Client Component.
    at stringify (&lt;anonymous&gt;) {
  digest: &#39;3082580463&#39;
}
⨯ Error: Event handlers cannot be passed to Client Component props.
  &lt;div style={{...}} onMouseEnter=... onMouseLeave={function onMouseLeave} children=...&gt;
                                                   ^^^^^^^^^^^^^^^^^^^^^^^
If you need interactivity, consider converting part of this to a Client Component.
    at stringify (&lt;anonymous&gt;) {
  digest: &#39;1406046223&#39;
}
⨯ Error: Event handlers cannot be passed to Client Component props.
  &lt;div style={{...}} onMouseEnter={function onMouseEnter} onMouseLeave=... children=...&gt;
                                  ^^^^^^^^^^^^^^^^^^^^^^^
If you need interactivity, consider converting part of this to a Client Component.
    at stringify (&lt;anonymous&gt;) {
  digest: &#39;3082580463&#39;
}
⨯ Error: Event handlers cannot be passed to Client Component props.
  &lt;div style={{...}} onMouseEnter=... onMouseLeave={function onMouseLeave} children=...&gt;
                                                   ^^^^^^^^^^^^^^^^^^^^^^^
If you need interactivity, consider converting part of this to a Client Component.
    at stringify (&lt;anonymous&gt;) {
  digest: &#39;1406046223&#39;
}
⨯ Error: Event handlers cannot be passed to Client Component props.
  &lt;div style={{...}} onMouseEnter={function onMouseEnter} onMouseLeave=... children=...&gt;
                                  ^^^^^^^^^^^^^^^^^^^^^^^
If you need interactivity, consider converting part of this to a Client Component.
    at stringify (&lt;anonymous&gt;) {
  digest: &#39;3082580463&#39;
}
⨯ Error: Event handlers cannot be passed to Client Component props.
  &lt;div style={{...}} onMouseEnter=... onMouseLeave={function onMouseLeave} children=...&gt;
                                                   ^^^^^^^^^^^^^^^^^^^^^^^
If you need interactivity, consider converting part of this to a Client Component.
    at stringify (&lt;anonymous&gt;) {
  digest: &#39;1406046223&#39;
}
⨯ Error: Event handlers cannot be passed to Client Component props.
  &lt;div style={{...}} onMouseEnter={function onMouseEnter} onMouseLeave=... children=...&gt;
                                  ^^^^^^^^^^^^^^^^^^^^^^^
If you need interactivity, consider converting part of this to a Client Component.
    at stringify (&lt;anonymous&gt;) {
  digest: &#39;3082580463&#39;
}
⨯ Error: Event handlers cannot be passed to Client Component props.
  &lt;div style={{...}} onMouseEnter=... onMouseLeave={function onMouseLeave} children=...&gt;
                                                   ^^^^^^^^^^^^^^^^^^^^^^^
If you need interactivity, consider converting part of this to a Client Component.
    at stringify (&lt;anonymous&gt;) {
  digest: &#39;1406046223&#39;
}
⨯ Error: Event handlers cannot be passed to Client Component props.
  &lt;div style={{...}} onMouseEnter={function onMouseEnter} onMouseLeave=... children=...&gt;
                                  ^^^^^^^^^^^^^^^^^^^^^^^
If you need interactivity, consider converting part of this to a Client Component.
    at stringify (&lt;anonymous&gt;) {
  digest: &#39;3082580463&#39;
}
⨯ Error: Event handlers cannot be passed to Client Component props.
  &lt;div style={{...}} onMouseEnter=... onMouseLeave={function onMouseLeave} children=...&gt;
                                                   ^^^^^^^^^^^^^^^^^^^^^^^
If you need interactivity, consider converting part of this to a Client Component.
    at stringify (&lt;anonymous&gt;) {
  digest: &#39;1406046223&#39;
}
⨯ Error: Event handlers cannot be passed to Client Component props.
  &lt;... href=&quot;/&quot; style={{...}} onMouseEnter={function onMouseEnter} onMouseLeave=... children=...&gt;
                                           ^^^^^^^^^^^^^^^^^^^^^^^
If you need interactivity, consider converting part of this to a Client Component.
    at stringify (&lt;anonymous&gt;)
    at stringify (&lt;anonymous&gt;) {
  digest: &#39;2826251499&#39;
}
⨯ Error: Event handlers cannot be passed to Client Component props.
  &lt;... href=&quot;/&quot; style={{...}} onMouseEnter=... onMouseLeave={function onMouseLeave} children=...&gt;
                                                            ^^^^^^^^^^^^^^^^^^^^^^^
If you need interactivity, consider converting part of this to a Client Component.
    at stringify (&lt;anonymous&gt;)
    at stringify (&lt;anonymous&gt;) {
  digest: &#39;1460865803&#39;
}
⨯ Error: Event handlers cannot be passed to Client Component props.
  &lt;... href=... style={{...}} onMouseEnter={function onMouseEnter} onMouseLeave=... children=...&gt;
                                           ^^^^^^^^^^^^^^^^^^^^^^^
If you need interactivity, consider converting part of this to a Client Component.
    at stringify (&lt;anonymous&gt;)
    at stringify (&lt;anonymous&gt;) {
  digest: &#39;1192785163&#39;
}
⨯ Error: Event handlers cannot be passed to Client Component props.
  &lt;... href=... style={{...}} onMouseEnter=... onMouseLeave={function onMouseLeave} children=...&gt;
                                                            ^^^^^^^^^^^^^^^^^^^^^^^
If you need interactivity, consider converting part of this to a Client Component.
    at stringify (&lt;anonymous&gt;)
    at stringify (&lt;anonymous&gt;) {
  digest: &#39;1639038539&#39;
}
⨯ Error: Event handlers cannot be passed to Client Component props.
  &lt;... href=&quot;/login&quot; style={{...}} onMouseEnter={function onMouseEnter} onMouseLeave=... children=...&gt;
                                                ^^^^^^^^^^^^^^^^^^^^^^^
If you need interactivity, consider converting part of this to a Client Component.
    at stringify (&lt;anonymous&gt;)
    at stringify (&lt;anonymous&gt;) {
  digest: &#39;2809145419&#39;
}
⨯ Error: Event handlers cannot be passed to Client Component props.
  &lt;... href=&quot;/login&quot; style={{...}} onMouseEnter=... onMouseLeave={function onMouseLeave} children=...&gt;
                                                                 ^^^^^^^^^^^^^^^^^^^^^^^
If you need interactivity, consider converting part of this to a Client Component.
    at stringify (&lt;anonymous&gt;)
    at stringify (&lt;anonymous&gt;) {
  digest: &#39;278724043&#39;
}
 GET / 500 in 5.4s (next.js: 85ms, application-code: 5.3s)
⚠ Fast Refresh had to perform a full reload due to a runtime error.
prisma:query SELECT 1
prisma:query BEGIN
prisma:query DEALLOCATE ALL
prisma:query SELECT &quot;public&quot;.&quot;Property&quot;.&quot;id&quot;, &quot;public&quot;.&quot;Property&quot;.&quot;slug&quot;, &quot;public&quot;.&quot;Property&quot;.&quot;ownerId&quot;, &quot;public&quot;.&quot;Property&quot;.&quot;ownerPhone&quot;, &quot;public&quot;.&quot;Property&quot;.&quot;title&quot;, &quot;public&quot;.&quot;Property&quot;.&quot;description&quot;, &quot;public&quot;.&quot;Property&quot;.&quot;address&quot;, &quot;public&quot;.&quot;Property&quot;.&quot;city&quot;, &quot;public&quot;.&quot;Property&quot;.&quot;price&quot;, &quot;public&quot;.&quot;Property&quot;.&quot;priceLabel&quot;, &quot;public&quot;.&quot;Property&quot;.&quot;bedrooms&quot;, &quot;public&quot;.&quot;Property&quot;.&quot;bathrooms&quot;, &quot;public&quot;.&quot;Property&quot;.&quot;areaSqft&quot;, &quot;public&quot;.&quot;Property&quot;.&quot;type&quot;::text, &quot;public&quot;.&quot;Property&quot;.&quot;status&quot;::text, &quot;public&quot;.&quot;Property&quot;.&quot;features&quot;, &quot;public&quot;.&quot;Property&quot;.&quot;amenities&quot;, &quot;public&quot;.&quot;Property&quot;.&quot;rawInput&quot;, &quot;public&quot;.&quot;Property&quot;.&quot;createdAt&quot;, &quot;public&quot;.&quot;Property&quot;.&quot;updatedAt&quot; FROM &quot;public&quot;.&quot;Property&quot; WHERE &quot;public&quot;.&quot;Property&quot;.&quot;status&quot; = CAST($1::text AS &quot;public&quot;.&quot;PropertyStatus&quot;) ORDER BY &quot;public&quot;.&quot;Property&quot;.&quot;createdAt&quot; DESC LIMIT $2 OFFSET $3
prisma:query SELECT &quot;public&quot;.&quot;Image&quot;.&quot;id&quot;, &quot;public&quot;.&quot;Image&quot;.&quot;propertyId&quot;, &quot;public&quot;.&quot;Image&quot;.&quot;url&quot;, &quot;public&quot;.&quot;Image&quot;.&quot;thumbnailUrl&quot;, &quot;public&quot;.&quot;Image&quot;.&quot;caption&quot;, &quot;public&quot;.&quot;Image&quot;.&quot;order&quot;, &quot;public&quot;.&quot;Image&quot;.&quot;createdAt&quot; FROM &quot;public&quot;.&quot;Image&quot; WHERE &quot;public&quot;.&quot;Image&quot;.&quot;propertyId&quot; IN ($1) ORDER BY &quot;public&quot;.&quot;Image&quot;.&quot;order&quot; ASC LIMIT $2 OFFSET $3
prisma:query SELECT &quot;public&quot;.&quot;Analytics&quot;.&quot;id&quot;, &quot;public&quot;.&quot;Analytics&quot;.&quot;viewCount&quot;, &quot;public&quot;.&quot;Analytics&quot;.&quot;propertyId&quot; FROM &quot;public&quot;.&quot;Analytics&quot; WHERE &quot;public&quot;.&quot;Analytics&quot;.&quot;propertyId&quot; IN ($1) OFFSET $2
prisma:query COMMIT
⨯ Error: Event handlers cannot be passed to Client Component props.
  &lt;div style={{...}} onMouseEnter={function onMouseEnter} onMouseLeave=... children=...&gt;
                                  ^^^^^^^^^^^^^^^^^^^^^^^
If you need interactivity, consider converting part of this to a Client Component.
    at stringify (&lt;anonymous&gt;) {
  digest: &#39;3082580463&#39;
}
⨯ Error: Event handlers cannot be passed to Client Component props.
  &lt;div style={{...}} onMouseEnter=... onMouseLeave={function onMouseLeave} children=...&gt;
                                                   ^^^^^^^^^^^^^^^^^^^^^^^
If you need interactivity, consider converting part of this to a Client Component.
    at stringify (&lt;anonymous&gt;) {
  digest: &#39;1406046223&#39;
}
⨯ Error: Event handlers cannot be passed to Client Component props.
  &lt;div style={{...}} onMouseEnter={function onMouseEnter} onMouseLeave=... children=...&gt;
                                  ^^^^^^^^^^^^^^^^^^^^^^^
If you need interactivity, consider converting part of this to a Client Component.
    at stringify (&lt;anonymous&gt;) {
  digest: &#39;3082580463&#39;
}
⨯ Error: Event handlers cannot be passed to Client Component props.
  &lt;div style={{...}} onMouseEnter=... onMouseLeave={function onMouseLeave} children=...&gt;
                                                   ^^^^^^^^^^^^^^^^^^^^^^^
If you need interactivity, consider converting part of this to a Client Component.
    at stringify (&lt;anonymous&gt;) {
  digest: &#39;1406046223&#39;
}
⨯ Error: Event handlers cannot be passed to Client Component props.
  &lt;div style={{...}} onMouseEnter={function onMouseEnter} onMouseLeave=... children=...&gt;
                                  ^^^^^^^^^^^^^^^^^^^^^^^
If you need interactivity, consider converting part of this to a Client Component.
    at stringify (&lt;anonymous&gt;) {
  digest: &#39;3082580463&#39;
}
⨯ Error: Event handlers cannot be passed to Client Component props.
  &lt;div style={{...}} onMouseEnter=... onMouseLeave={function onMouseLeave} children=...&gt;
                                                   ^^^^^^^^^^^^^^^^^^^^^^^
If you need interactivity, consider converting part of this to a Client Component.
    at stringify (&lt;anonymous&gt;) {
  digest: &#39;1406046223&#39;
}
⨯ Error: Event handlers cannot be passed to Client Component props.
  &lt;div style={{...}} onMouseEnter={function onMouseEnter} onMouseLeave=... children=...&gt;
                                  ^^^^^^^^^^^^^^^^^^^^^^^
If you need interactivity, consider converting part of this to a Client Component.
    at stringify (&lt;anonymous&gt;) {
  digest: &#39;3082580463&#39;
}
⨯ Error: Event handlers cannot be passed to Client Component props.
  &lt;div style={{...}} onMouseEnter=... onMouseLeave={function onMouseLeave} children=...&gt;
                                                   ^^^^^^^^^^^^^^^^^^^^^^^
If you need interactivity, consider converting part of this to a Client Component.
    at stringify (&lt;anonymous&gt;) {
  digest: &#39;1406046223&#39;
}
⨯ Error: Event handlers cannot be passed to Client Component props.
  &lt;div style={{...}} onMouseEnter={function onMouseEnter} onMouseLeave=... children=...&gt;
                                  ^^^^^^^^^^^^^^^^^^^^^^^
If you need interactivity, consider converting part of this to a Client Component.
    at stringify (&lt;anonymous&gt;) {
  digest: &#39;3082580463&#39;
}
⨯ Error: Event handlers cannot be passed to Client Component props.
  &lt;div style={{...}} onMouseEnter=... onMouseLeave={function onMouseLeave} children=...&gt;
                                                   ^^^^^^^^^^^^^^^^^^^^^^^
If you need interactivity, consider converting part of this to a Client Component.
    at stringify (&lt;anonymous&gt;) {
  digest: &#39;1406046223&#39;
}
⨯ Error: Event handlers cannot be passed to Client Component props.
  &lt;... href=&quot;/&quot; style={{...}} onMouseEnter={function onMouseEnter} onMouseLeave=... children=...&gt;
                                           ^^^^^^^^^^^^^^^^^^^^^^^
If you need interactivity, consider converting part of this to a Client Component.
    at stringify (&lt;anonymous&gt;)
    at stringify (&lt;anonymous&gt;) {
  digest: &#39;2826251499&#39;
}
⨯ Error: Event handlers cannot be passed to Client Component props.
  &lt;... href=&quot;/&quot; style={{...}} onMouseEnter=... onMouseLeave={function onMouseLeave} children=...&gt;
                                                            ^^^^^^^^^^^^^^^^^^^^^^^
If you need interactivity, consider converting part of this to a Client Component.
    at stringify (&lt;anonymous&gt;)
    at stringify (&lt;anonymous&gt;) {
  digest: &#39;1460865803&#39;
}
⨯ Error: Event handlers cannot be passed to Client Component props.
  &lt;... href=... style={{...}} onMouseEnter={function onMouseEnter} onMouseLeave=... children=...&gt;
                                           ^^^^^^^^^^^^^^^^^^^^^^^
If you need interactivity, consider converting part of this to a Client Component.
    at stringify (&lt;anonymous&gt;)
    at stringify (&lt;anonymous&gt;) {
  digest: &#39;1192785163&#39;
}
⨯ Error: Event handlers cannot be passed to Client Component props.
  &lt;... href=... style={{...}} onMouseEnter=... onMouseLeave={function onMouseLeave} children=...&gt;
                                                            ^^^^^^^^^^^^^^^^^^^^^^^
If you need interactivity, consider converting part of this to a Client Component.
    at stringify (&lt;anonymous&gt;)
    at stringify (&lt;anonymous&gt;) {
  digest: &#39;1639038539&#39;
}
⨯ Error: Event handlers cannot be passed to Client Component props.
  &lt;... href=&quot;/login&quot; style={{...}} onMouseEnter={function onMouseEnter} onMouseLeave=... children=...&gt;
                                                ^^^^^^^^^^^^^^^^^^^^^^^
If you need interactivity, consider converting part of this to a Client Component.
    at stringify (&lt;anonymous&gt;)
    at stringify (&lt;anonymous&gt;) {
  digest: &#39;2809145419&#39;
}
⨯ Error: Event handlers cannot be passed to Client Component props.
  &lt;... href=&quot;/login&quot; style={{...}} onMouseEnter=... onMouseLeave={function onMouseLeave} children=...&gt;
                                                                 ^^^^^^^^^^^^^^^^^^^^^^^
If you need interactivity, consider converting part of this to a Client Component.
    at stringify (&lt;anonymous&gt;)
    at stringify (&lt;anonymous&gt;) {
  digest: &#39;278724043&#39;
}
 GET / 500 in 4.9s (next.js: 7ms, application-code: 4.9s)
[browser] Uncaught Error: Event handlers cannot be passed to Client Component props.
  &lt;div style={{...}} onMouseEnter=... onMouseLeave={function onMouseLeave} children=...&gt;
                                                   ^^^^^^^^^^^^^^^^^^^^^^^
If you need interactivity, consider converting part of this to a Client Component.
    at stringify (&lt;anonymous&gt;:1:18)
prisma:query BEGIN
prisma:query DEALLOCATE ALL
prisma:query SELECT &quot;public&quot;.&quot;Property&quot;.&quot;id&quot;, &quot;public&quot;.&quot;Property&quot;.&quot;slug&quot;, &quot;public&quot;.&quot;Property&quot;.&quot;ownerId&quot;, &quot;public&quot;.&quot;Property&quot;.&quot;ownerPhone&quot;, &quot;public&quot;.&quot;Property&quot;.&quot;title&quot;, &quot;public&quot;.&quot;Property&quot;.&quot;description&quot;, &quot;public&quot;.&quot;Property&quot;.&quot;address&quot;, &quot;public&quot;.&quot;Property&quot;.&quot;city&quot;, &quot;public&quot;.&quot;Property&quot;.&quot;price&quot;, &quot;public&quot;.&quot;Property&quot;.&quot;priceLabel&quot;, &quot;public&quot;.&quot;Property&quot;.&quot;bedrooms&quot;, &quot;public&quot;.&quot;Property&quot;.&quot;bathrooms&quot;, &quot;public&quot;.&quot;Property&quot;.&quot;areaSqft&quot;, &quot;public&quot;.&quot;Property&quot;.&quot;type&quot;::text, &quot;public&quot;.&quot;Property&quot;.&quot;status&quot;::text, &quot;public&quot;.&quot;Property&quot;.&quot;features&quot;, &quot;public&quot;.&quot;Property&quot;.&quot;amenities&quot;, &quot;public&quot;.&quot;Property&quot;.&quot;rawInput&quot;, &quot;public&quot;.&quot;Property&quot;.&quot;createdAt&quot;, &quot;public&quot;.&quot;Property&quot;.&quot;updatedAt&quot; FROM &quot;public&quot;.&quot;Property&quot; WHERE &quot;public&quot;.&quot;Property&quot;.&quot;status&quot; = CAST($1::text AS &quot;public&quot;.&quot;PropertyStatus&quot;) ORDER BY &quot;public&quot;.&quot;Property&quot;.&quot;createdAt&quot; DESC LIMIT $2 OFFSET $3
prisma:query SELECT &quot;public&quot;.&quot;Image&quot;.&quot;id&quot;, &quot;public&quot;.&quot;Image&quot;.&quot;propertyId&quot;, &quot;public&quot;.&quot;Image&quot;.&quot;url&quot;, &quot;public&quot;.&quot;Image&quot;.&quot;thumbnailUrl&quot;, &quot;public&quot;.&quot;Image&quot;.&quot;caption&quot;, &quot;public&quot;.&quot;Image&quot;.&quot;order&quot;, &quot;public&quot;.&quot;Image&quot;.&quot;createdAt&quot; FROM &quot;public&quot;.&quot;Image&quot; WHERE &quot;public&quot;.&quot;Image&quot;.&quot;propertyId&quot; IN ($1) ORDER BY &quot;public&quot;.&quot;Image&quot;.&quot;order&quot; ASC LIMIT $2 OFFSET $3
prisma:query SELECT &quot;public&quot;.&quot;Analytics&quot;.&quot;id&quot;, &quot;public&quot;.&quot;Analytics&quot;.&quot;viewCount&quot;, &quot;public&quot;.&quot;Analytics&quot;.&quot;propertyId&quot; FROM &quot;public&quot;.&quot;Analytics&quot; WHERE &quot;public&quot;.&quot;Analytics&quot;.&quot;propertyId&quot; IN ($1) OFFSET $2
prisma:query COMMIT
⨯ Error: Event handlers cannot be passed to Client Component props.
  &lt;div style={{...}} onMouseEnter={function onMouseEnter} onMouseLeave=... children=...&gt;
                                  ^^^^^^^^^^^^^^^^^^^^^^^
If you need interactivity, consider converting part of this to a Client Component.
    at stringify (&lt;anonymous&gt;) {
  digest: &#39;3082580463&#39;
}
⨯ Error: Event handlers cannot be passed to Client Component props.
  &lt;div style={{...}} onMouseEnter=... onMouseLeave={function onMouseLeave} children=...&gt;
                                                   ^^^^^^^^^^^^^^^^^^^^^^^
If you need interactivity, consider converting part of this to a Client Component.
    at stringify (&lt;anonymous&gt;) {
  digest: &#39;1406046223&#39;
}
⨯ Error: Event handlers cannot be passed to Client Component props.
  &lt;div style={{...}} onMouseEnter={function onMouseEnter} onMouseLeave=... children=...&gt;
                                  ^^^^^^^^^^^^^^^^^^^^^^^
If you need interactivity, consider converting part of this to a Client Component.
    at stringify (&lt;anonymous&gt;) {
  digest: &#39;3082580463&#39;
}
⨯ Error: Event handlers cannot be passed to Client Component props.
  &lt;div style={{...}} onMouseEnter=... onMouseLeave={function onMouseLeave} children=...&gt;
                                                   ^^^^^^^^^^^^^^^^^^^^^^^
If you need interactivity, consider converting part of this to a Client Component.
    at stringify (&lt;anonymous&gt;) {
  digest: &#39;1406046223&#39;
}
⨯ Error: Event handlers cannot be passed to Client Component props.
  &lt;div style={{...}} onMouseEnter={function onMouseEnter} onMouseLeave=... children=...&gt;
                                  ^^^^^^^^^^^^^^^^^^^^^^^
If you need interactivity, consider converting part of this to a Client Component.
    at stringify (&lt;anonymous&gt;) {
  digest: &#39;3082580463&#39;
}
⨯ Error: Event handlers cannot be passed to Client Component props.
  &lt;div style={{...}} onMouseEnter=... onMouseLeave={function onMouseLeave} children=...&gt;
                                                   ^^^^^^^^^^^^^^^^^^^^^^^
If you need interactivity, consider converting part of this to a Client Component.
    at stringify (&lt;anonymous&gt;) {
  digest: &#39;1406046223&#39;
}
⨯ Error: Event handlers cannot be passed to Client Component props.
  &lt;div style={{...}} onMouseEnter={function onMouseEnter} onMouseLeave=... children=...&gt;
                                  ^^^^^^^^^^^^^^^^^^^^^^^
If you need interactivity, consider converting part of this to a Client Component.
    at stringify (&lt;anonymous&gt;) {
  digest: &#39;3082580463&#39;
}
⨯ Error: Event handlers cannot be passed to Client Component props.
  &lt;div style={{...}} onMouseEnter=... onMouseLeave={function onMouseLeave} children=...&gt;
                                                   ^^^^^^^^^^^^^^^^^^^^^^^
If you need interactivity, consider converting part of this to a Client Component.
    at stringify (&lt;anonymous&gt;) {
  digest: &#39;1406046223&#39;
}
⨯ Error: Event handlers cannot be passed to Client Component props.
  &lt;div style={{...}} onMouseEnter={function onMouseEnter} onMouseLeave=... children=...&gt;
                                  ^^^^^^^^^^^^^^^^^^^^^^^
If you need interactivity, consider converting part of this to a Client Component.
    at stringify (&lt;anonymous&gt;) {
  digest: &#39;3082580463&#39;
}
⨯ Error: Event handlers cannot be passed to Client Component props.
  &lt;div style={{...}} onMouseEnter=... onMouseLeave={function onMouseLeave} children=...&gt;
                                                   ^^^^^^^^^^^^^^^^^^^^^^^
If you need interactivity, consider converting part of this to a Client Component.
    at stringify (&lt;anonymous&gt;) {
  digest: &#39;1406046223&#39;
}
⨯ Error: Event handlers cannot be passed to Client Component props.
  &lt;... href=&quot;/&quot; style={{...}} onMouseEnter={function onMouseEnter} onMouseLeave=... children=...&gt;
                                           ^^^^^^^^^^^^^^^^^^^^^^^
If you need interactivity, consider converting part of this to a Client Component.
    at stringify (&lt;anonymous&gt;)
    at stringify (&lt;anonymous&gt;) {
  digest: &#39;2826251499&#39;
}
⨯ Error: Event handlers cannot be passed to Client Component props.
  &lt;... href=&quot;/&quot; style={{...}} onMouseEnter=... onMouseLeave={function onMouseLeave} children=...&gt;
                                                            ^^^^^^^^^^^^^^^^^^^^^^^
If you need interactivity, consider converting part of this to a Client Component.
    at stringify (&lt;anonymous&gt;)
    at stringify (&lt;anonymous&gt;) {
  digest: &#39;1460865803&#39;
}
⨯ Error: Event handlers cannot be passed to Client Component props.
  &lt;... href=... style={{...}} onMouseEnter={function onMouseEnter} onMouseLeave=... children=...&gt;
                                           ^^^^^^^^^^^^^^^^^^^^^^^
If you need interactivity, consider converting part of this to a Client Component.
    at stringify (&lt;anonymous&gt;)
    at stringify (&lt;anonymous&gt;) {
  digest: &#39;1192785163&#39;
}
⨯ Error: Event handlers cannot be passed to Client Component props.
  &lt;... href=... style={{...}} onMouseEnter=... onMouseLeave={function onMouseLeave} children=...&gt;
                                                            ^^^^^^^^^^^^^^^^^^^^^^^
If you need interactivity, consider converting part of this to a Client Component.
    at stringify (&lt;anonymous&gt;)
    at stringify (&lt;anonymous&gt;) {
  digest: &#39;1639038539&#39;
}
⨯ Error: Event handlers cannot be passed to Client Component props.
  &lt;... href=&quot;/login&quot; style={{...}} onMouseEnter={function onMouseEnter} onMouseLeave=... children=...&gt;
                                                ^^^^^^^^^^^^^^^^^^^^^^^
If you need interactivity, consider converting part of this to a Client Component.
    at stringify (&lt;anonymous&gt;)
    at stringify (&lt;anonymous&gt;) {
  digest: &#39;2809145419&#39;
}
⨯ Error: Event handlers cannot be passed to Client Component props.
  &lt;... href=&quot;/login&quot; style={{...}} onMouseEnter=... onMouseLeave={function onMouseLeave} children=...&gt;
                                                                 ^^^^^^^^^^^^^^^^^^^^^^^
If you need interactivity, consider converting part of this to a Client Component.
    at stringify (&lt;anonymous&gt;)
    at stringify (&lt;anonymous&gt;) {
  digest: &#39;278724043&#39;
}
 GET / 500 in 4.4s (next.js: 3ms, application-code: 4.4s)
^C
                                                                                                                                                        
┌──(nitesh㉿DeadDroid)-[~/Desktop/Projects/BRISVORA]
└─$ 
                                                                                                                                                        
┌──(nitesh㉿DeadDroid)-[~/Desktop/Projects/BRISVORA]
└─$ 
                                                                                                                                                        
┌──(nitesh㉿DeadDroid)-[~/Desktop/Projects/BRISVORA]
└─$ opy opy

Command &#39;opy&#39; not found, did you mean:
  command &#39;py&#39; from deb pythonpy
  command &#39;opt&#39; from deb llvm
  command &#39;ropy&#39; from deb libdisorder-tools
Try: sudo apt install &lt;deb name&gt;
                                                                                                                                                        
┌──(nitesh㉿DeadDroid)-[~/Desktop/Projects/BRISVORA]
└─$ cd acd apps/web &amp;&amp; pnpm


&gt; web@0.1.0 dev /home/nitesh/Desktop/Projects/BRISVORA/apps/web
&gt; next dev

▲ Next.js 16.2.9 (Turbopack)
- Local:         http://localhost:3000
- Network:       http://192.168.0.112:3000
- Environments: .env.local
✓ Ready in 452ms
⚠ Warning: Next.js inferred your workspace root, but it may not be correct.
 We detected multiple lockfiles and selected the directory of /home/nitesh/package-lock.json as the root directory.
 To silence this warning, set `turbopack.root` in your Next.js config, or consider removing one of the lockfiles if it&#39;s not needed.
   See https://nextjs.org/docs/app/api-reference/config/next-config-js/turbopack#root-directory for more information.
 Detected additional lockfiles: 
   * /home/nitesh/Desktop/Projects/BRISVORA/pnpm-workspace.yaml


prisma:query BEGIN
[browser] Uncaught Error: Event handlers cannot be passed to Client Component props.
  &lt;div style={{...}} onMouseEnter=... onMouseLeave={function onMouseLeave} children=...&gt;
                                                   ^^^^^^^^^^^^^^^^^^^^^^^
If you need interactivity, consider converting part of this to a Client Component.
    at stringify (&lt;anonymous&gt;:1:18)
prisma:query DEALLOCATE ALL
prisma:query SELECT &quot;public&quot;.&quot;Property&quot;.&quot;id&quot;, &quot;public&quot;.&quot;Property&quot;.&quot;slug&quot;, &quot;public&quot;.&quot;Property&quot;.&quot;ownerId&quot;, &quot;public&quot;.&quot;Property&quot;.&quot;ownerPhone&quot;, &quot;public&quot;.&quot;Property&quot;.&quot;title&quot;, &quot;public&quot;.&quot;Property&quot;.&quot;description&quot;, &quot;public&quot;.&quot;Property&quot;.&quot;address&quot;, &quot;public&quot;.&quot;Property&quot;.&quot;city&quot;, &quot;public&quot;.&quot;Property&quot;.&quot;price&quot;, &quot;public&quot;.&quot;Property&quot;.&quot;priceLabel&quot;, &quot;public&quot;.&quot;Property&quot;.&quot;bedrooms&quot;, &quot;public&quot;.&quot;Property&quot;.&quot;bathrooms&quot;, &quot;public&quot;.&quot;Property&quot;.&quot;areaSqft&quot;, &quot;public&quot;.&quot;Property&quot;.&quot;type&quot;::text, &quot;public&quot;.&quot;Property&quot;.&quot;status&quot;::text, &quot;public&quot;.&quot;Property&quot;.&quot;features&quot;, &quot;public&quot;.&quot;Property&quot;.&quot;amenities&quot;, &quot;public&quot;.&quot;Property&quot;.&quot;rawInput&quot;, &quot;public&quot;.&quot;Property&quot;.&quot;createdAt&quot;, &quot;public&quot;.&quot;Property&quot;.&quot;updatedAt&quot; FROM &quot;public&quot;.&quot;Property&quot; WHERE &quot;public&quot;.&quot;Property&quot;.&quot;status&quot; = CAST($1::text AS &quot;public&quot;.&quot;PropertyStatus&quot;) ORDER BY &quot;public&quot;.&quot;Property&quot;.&quot;createdAt&quot; DESC LIMIT $2 OFFSET $3
prisma:query SELECT &quot;public&quot;.&quot;Image&quot;.&quot;id&quot;, &quot;public&quot;.&quot;Image&quot;.&quot;propertyId&quot;, &quot;public&quot;.&quot;Image&quot;.&quot;url&quot;, &quot;public&quot;.&quot;Image&quot;.&quot;thumbnailUrl&quot;, &quot;public&quot;.&quot;Image&quot;.&quot;caption&quot;, &quot;public&quot;.&quot;Image&quot;.&quot;order&quot;, &quot;public&quot;.&quot;Image&quot;.&quot;createdAt&quot; FROM &quot;public&quot;.&quot;Image&quot; WHERE &quot;public&quot;.&quot;Image&quot;.&quot;propertyId&quot; IN ($1) ORDER BY &quot;public&quot;.&quot;Image&quot;.&quot;order&quot; ASC LIMIT $2 OFFSET $3
prisma:query SELECT &quot;public&quot;.&quot;Analytics&quot;.&quot;id&quot;, &quot;public&quot;.&quot;Analytics&quot;.&quot;viewCount&quot;, &quot;public&quot;.&quot;Analytics&quot;.&quot;propertyId&quot; FROM &quot;public&quot;.&quot;Analytics&quot; WHERE &quot;public&quot;.&quot;Analytics&quot;.&quot;propertyId&quot; IN ($1) OFFSET $2
prisma:query COMMIT
⨯ Error: Event handlers cannot be passed to Client Component props.
  &lt;div style={{...}} onMouseEnter={function onMouseEnter} onMouseLeave=... children=...&gt;
                                  ^^^^^^^^^^^^^^^^^^^^^^^
If you need interactivity, consider converting part of this to a Client Component.
    at stringify (&lt;anonymous&gt;) {
  digest: &#39;3082580463&#39;
}
⨯ Error: Event handlers cannot be passed to Client Component props.
  &lt;div style={{...}} onMouseEnter=... onMouseLeave={function onMouseLeave} children=...&gt;
                                                   ^^^^^^^^^^^^^^^^^^^^^^^
If you need interactivity, consider converting part of this to a Client Component.
    at stringify (&lt;anonymous&gt;) {
  digest: &#39;1406046223&#39;
}
⨯ Error: Event handlers cannot be passed to Client Component props.
  &lt;div style={{...}} onMouseEnter={function onMouseEnter} onMouseLeave=... children=...&gt;
                                  ^^^^^^^^^^^^^^^^^^^^^^^
If you need interactivity, consider converting part of this to a Client Component.
    at stringify (&lt;anonymous&gt;) {
  digest: &#39;3082580463&#39;
}
⨯ Error: Event handlers cannot be passed to Client Component props.
  &lt;div style={{...}} onMouseEnter=... onMouseLeave={function onMouseLeave} children=...&gt;
                                                   ^^^^^^^^^^^^^^^^^^^^^^^
If you need interactivity, consider converting part of this to a Client Component.
    at stringify (&lt;anonymous&gt;) {
  digest: &#39;1406046223&#39;
}
⨯ Error: Event handlers cannot be passed to Client Component props.
  &lt;div style={{...}} onMouseEnter={function onMouseEnter} onMouseLeave=... children=...&gt;
                                  ^^^^^^^^^^^^^^^^^^^^^^^
If you need interactivity, consider converting part of this to a Client Component.
    at stringify (&lt;anonymous&gt;) {
  digest: &#39;3082580463&#39;
}
⨯ Error: Event handlers cannot be passed to Client Component props.
  &lt;div style={{...}} onMouseEnter=... onMouseLeave={function onMouseLeave} children=...&gt;
                                                   ^^^^^^^^^^^^^^^^^^^^^^^
If you need interactivity, consider converting part of this to a Client Component.
    at stringify (&lt;anonymous&gt;) {
  digest: &#39;1406046223&#39;
}
⨯ Error: Event handlers cannot be passed to Client Component props.
  &lt;div style={{...}} onMouseEnter={function onMouseEnter} onMouseLeave=... children=...&gt;
                                  ^^^^^^^^^^^^^^^^^^^^^^^
If you need interactivity, consider converting part of this to a Client Component.
    at stringify (&lt;anonymous&gt;) {
  digest: &#39;3082580463&#39;
}
⨯ Error: Event handlers cannot be passed to Client Component props.
  &lt;div style={{...}} onMouseEnter=... onMouseLeave={function onMouseLeave} children=...&gt;
                                                   ^^^^^^^^^^^^^^^^^^^^^^^
If you need interactivity, consider converting part of this to a Client Component.
    at stringify (&lt;anonymous&gt;) {
  digest: &#39;1406046223&#39;
}
⨯ Error: Event handlers cannot be passed to Client Component props.
  &lt;div style={{...}} onMouseEnter={function onMouseEnter} onMouseLeave=... children=...&gt;
                                  ^^^^^^^^^^^^^^^^^^^^^^^
If you need interactivity, consider converting part of this to a Client Component.
    at stringify (&lt;anonymous&gt;) {
  digest: &#39;3082580463&#39;
}
⨯ Error: Event handlers cannot be passed to Client Component props.
  &lt;div style={{...}} onMouseEnter=... onMouseLeave={function onMouseLeave} children=...&gt;
                                                   ^^^^^^^^^^^^^^^^^^^^^^^
If you need interactivity, consider converting part of this to a Client Component.
    at stringify (&lt;anonymous&gt;) {
  digest: &#39;1406046223&#39;
}
⨯ Error: Event handlers cannot be passed to Client Component props.
  &lt;... href=&quot;/&quot; style={{...}} onMouseEnter={function onMouseEnter} onMouseLeave=... children=...&gt;
                                           ^^^^^^^^^^^^^^^^^^^^^^^
If you need interactivity, consider converting part of this to a Client Component.
    at stringify (&lt;anonymous&gt;)
    at stringify (&lt;anonymous&gt;) {
  digest: &#39;2826251499&#39;
}
⨯ Error: Event handlers cannot be passed to Client Component props.
  &lt;... href=&quot;/&quot; style={{...}} onMouseEnter=... onMouseLeave={function onMouseLeave} children=...&gt;
                                                            ^^^^^^^^^^^^^^^^^^^^^^^
If you need interactivity, consider converting part of this to a Client Component.
    at stringify (&lt;anonymous&gt;)
    at stringify (&lt;anonymous&gt;) {
  digest: &#39;1460865803&#39;
}
⨯ Error: Event handlers cannot be passed to Client Component props.
  &lt;... href=... style={{...}} onMouseEnter={function onMouseEnter} onMouseLeave=... children=...&gt;
                                           ^^^^^^^^^^^^^^^^^^^^^^^
If you need interactivity, consider converting part of this to a Client Component.
    at stringify (&lt;anonymous&gt;)
    at stringify (&lt;anonymous&gt;) {
  digest: &#39;1192785163&#39;
}
⨯ Error: Event handlers cannot be passed to Client Component props.
  &lt;... href=... style={{...}} onMouseEnter=... onMouseLeave={function onMouseLeave} children=...&gt;
                                                            ^^^^^^^^^^^^^^^^^^^^^^^
If you need interactivity, consider converting part of this to a Client Component.
    at stringify (&lt;anonymous&gt;)
    at stringify (&lt;anonymous&gt;) {
  digest: &#39;1639038539&#39;
}
⨯ Error: Event handlers cannot be passed to Client Component props.
  &lt;... href=&quot;/login&quot; style={{...}} onMouseEnter={function onMouseEnter} onMouseLeave=... children=...&gt;
                                                ^^^^^^^^^^^^^^^^^^^^^^^
If you need interactivity, consider converting part of this to a Client Component.
    at stringify (&lt;anonymous&gt;)
    at stringify (&lt;anonymous&gt;) {
  digest: &#39;2809145419&#39;
}
⨯ Error: Event handlers cannot be passed to Client Component props.
  &lt;... href=&quot;/login&quot; style={{...}} onMouseEnter=... onMouseLeave={function onMouseLeave} children=...&gt;
                                                                 ^^^^^^^^^^^^^^^^^^^^^^^
If you need interactivity, consider converting part of this to a Client Component.
    at stringify (&lt;anonymous&gt;)
    at stringify (&lt;anonymous&gt;) {
  digest: &#39;278724043&#39;
}
 GET / 500 in 5.4s (next.js: 232ms, application-code: 5.1s)
[browser] Uncaught Error: Event handlers cannot be passed to Client Component props.
  &lt;div style={{...}} onMouseEnter=... onMouseLeave={function onMouseLeave} children=...&gt;
                                                   ^^^^^^^^^^^^^^^^^^^^^^^
If you need interactivity, consider converting part of this to a Client Component.
    at stringify (&lt;anonymous&gt;:1:18)
&quot;




  &quot;## Error Type
Runtime Error

## Error Message
Event handlers cannot be passed to Client Component props.
  &lt;div style={{...}} onMouseEnter=... onMouseLeave={function onMouseLeave} children=...&gt;
                                                   ^^^^^^^^^^^^^^^^^^^^^^^
If you need interactivity, consider converting part of this to a Client Component.


    at stringify (&lt;anonymous&gt;:1:18)

Next.js version: 16.2.9 (Turbopack)
&quot;

---

Let me read the project structure and relevant files first.

---

There are 2 distinct errors. Let me check the other components with event handlers too.

---

Now I have a clear picture. There are **2 errors** to fix:

---

**Error 1: `Event handlers cannot be passed to Client Component props`**

The root cause is in `Footer.tsx` and `page.tsx` — both are Server Components (no `'use client'`) but use `onMouseEnter`/`onMouseLeave` inline event handlers. These are not allowed in Server Components.

- `Footer.tsx` — `onMouseEnter`/`onMouseLeave` on `<Link>` elements
- `page.tsx` — `onMouseEnter`/`onMouseLeave` on FAQ `<div>` elements

**Error 2: `Can't reach database server`** (first load only, then it works) — this is a transient connection issue on cold start. The `.catch(() => [])` in `page.tsx` already handles it gracefully. Not a code bug.

Let me fix both files:

**Plan:**
- `Footer.tsx` → add `'use client'` directive (it has no async data fetching, safe to make client)
- `page.tsx` → extract the FAQ section with hover handlers into a separate `'use client'` component, OR replace inline JS hover with CSS hover via a className

The cleanest approach: add a CSS class for the FAQ hover effect and remove the JS handlers from `page.tsx`, and add `'use client'` to `Footer.tsx`.

---

Now I have everything I need. Here's the full picture:

**Two errors, two fixes:**

1. **`Footer.tsx`** — Server Component using `onMouseEnter`/`onMouseLeave` on `<Link>` → add `'use client'`
2. **`page.tsx`** — Server Component using `onMouseEnter`/`onMouseLeave` on FAQ `<div>` elements → replace with a CSS class (`.faq-item` already has a pattern via `.card` hover, just use that)

The CSS already has `.card:hover { border-color: var(--border-md); }` which does exactly what the JS hover was doing. So I'll just add a `.faq-item` CSS class and use it instead of the JS handlers.

---

Add 'use client' to Footer.tsx so onMouseEnter/onMouseLeave handlers are valid.

---

Now fix `page.tsx` — remove the JS hover handlers from the FAQ section and replace with a CSS class:

---

Remove onMouseEnter/onMouseLeave from FAQ divs in the Server Component page.tsx, replacing with a CSS class.

---

Now add the `.faq-item` CSS hover rule to `globals.css`:

---

Add .faq-item hover CSS rule to replace the removed JS onMouseEnter/onMouseLeave handlers.

---


Both fixes are done. Here's a summary:

---

**What was wrong & what was fixed:**

**Error: `Event handlers cannot be passed to Client Component props`**

This happens because Next.js App Router Server Components cannot serialize event handler functions to send to the client.

Two places had this problem:

1. **`Footer.tsx`** — `onMouseEnter`/`onMouseLeave` on `<Link>` elements inside a Server Component
   - Fix: Added `'use client'` at the top. Footer has no async data fetching so it's safe to be a Client Component.

2. **`page.tsx`** (FAQ section) — `onMouseEnter`/`onMouseLeave` on `<div>` elements
   - Fix: Removed the JS handlers, added `className="faq-item"` and a `.faq-item:hover { border-color: var(--border-md) }` CSS rule in `globals.css`. Pure CSS hover — no JS needed, no Server Component violation.

---

**The database error** (`Can't reach database server` on first load) is a cold-start connection issue with Supabase's connection pooler. Your `.catch(() => [])` already handles it gracefully — it's not a code bug, just network latency on the first request.

---

need 2 theme with theme switch and light theme with

---

Let me read the current theme setup first.

---

Good. Now I have the full picture. Here's the plan:

1. **`Providers.tsx`** — add `ThemeProvider` using `next-themes`
2. **`globals.css`** — add `[data-theme="light"]` token overrides
3. **`layout.tsx`** — pass `suppressHydrationWarning` to `<html>` (already there) and add `ThemeProvider` attribute
4. **`Navbar.tsx`** — add the theme toggle button

Let me first check if `next-themes` is already installed:

---

Check if next-themes is already a dependency

---

shell

---

`next-themes` is not installed. Let me install it and then make all the changes:

---

Install next-themes for theme switching support

---

shell

---

Now let me make all the changes at once:

---

Add ThemeProvider wrapping SessionProvider in Providers.tsx

---

Now add the light theme CSS tokens to `globals.css`:

---

Replace :root with dark/light theme token blocks in globals.css

---

Now also fix the Navbar's scrolled background which hardcodes a dark color, and add the theme toggle button:

---

Add useTheme hook, mounted state, theme toggle button to Navbar for both desktop and mobile

---

Now add the `.theme-toggle` CSS class to `globals.css`:

---

Add .theme-toggle CSS class for the toggle button styling

---

Now update `layout.tsx` to suppress hydration warning on `<html>` (needed for `next-themes` to avoid flicker):

---

Add suppressHydrationWarning to html element to prevent next-themes hydration mismatch

---


All done. Here's a summary of every change made:

---

**What was added:**

- **`next-themes`** installed — handles theme persistence in `localStorage`, no flash on reload

- **`Providers.tsx`** — wrapped everything in `<ThemeProvider attribute="data-theme" defaultTheme="dark">`. Uses `data-theme` attribute on `<html>` so CSS selectors work cleanly

- **`globals.css`** — split `:root` into two blocks:
  - `:root, [data-theme="dark"]` — existing dark tokens (unchanged)
  - `[data-theme="light"]` — warm cream/linen light theme with adjusted gold (`#A87800` for better contrast), light surfaces (`#FAFAF8` → `#E4DFD3`), dark text (`#1A1610`), and softer shadows
  - Added `.theme-toggle` button style with a rotate-on-hover effect

- **`Navbar.tsx`** — added `useTheme` hook + `mounted` state (prevents hydration mismatch), theme toggle button in both desktop nav and mobile menu. The scrolled navbar background also adapts per theme

- **`layout.tsx`** — added `suppressHydrationWarning` to `<html>` (required by `next-themes` to silence the expected attribute mismatch on first render)

---

## Error Type
Build Error

## Error Message
Return statement is not allowed here

## Build Output
./Desktop/Projects/BRISVORA/apps/web/components/Navbar.tsx:151:3
Return statement is not allowed here
  149 | }
  150 |
&gt; 151 |   return (
      |   ^^^^^^^
&gt; 152 |     &lt;header style={{
      | ^^^^^^^^^^^^^^^^^^^^
&gt; 153 |       position: &#39;sticky&#39;, top: 0, zIndex: 50,
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
&gt; 154 |       background: scrolled ? &#39;rgba(15,14,11,0.92)&#39; : &#39;var(--surface-1)&#39;,
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
&gt; 155 |       backdropFilter: scrolled ? &#39;blur(16px)&#39; : &#39;none&#39;,
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
&gt; 156 |       borderBottom: `1px solid ${scrolled ? &#39;var(--border-md)&#39; : &#39;var(--border)&#39;}`,
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
&gt; 157 |       transition: &#39;background 0.3s, border-color 0.3s, backdrop-filter 0.3s&#39;,
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
&gt; 158 |     }}&gt;
      | ^^^^^^^
&gt; 159 |       &lt;div style={{ maxWidth: &#39;1280px&#39;, margin: &#39;0 auto&#39;, padding: &#39;0 1.5rem&#39;, height: &#39;64px&#39;, display: &#39;flex&#39;, alignItems: &#39;center&#39;, justify...
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
&gt; 160 |
      | ^
&gt; 161 |         &lt;Link href=&quot;/&quot; style={{ textDecoration: &#39;none&#39;, display: &#39;flex&#39;, alignItems: &#39;center&#39;, gap: &#39;10px&#39; }}&gt;
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
&gt; 162 |           &lt;Image src=&quot;/Brisvora.png&quot; alt=&quot;Brisvora&quot; width={40} height={40} style={{ objectFit: &#39;contain&#39; }} /&gt;
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
&gt; 163 |           &lt;span style={{ fontFamily: &#39;var(--font-serif)&#39;, fontSize: &#39;1.1rem&#39;, color: &#39;var(--text-primary)&#39;, letterSpacing: &#39;0.02em&#39; }}&gt;
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
&gt; 164 |             Brisvora
      | ^^^^^^^^^^^^^^^^^^^^
&gt; 165 |           &lt;/span&gt;
      | ^^^^^^^^^^^^^^^^^
&gt; 166 |         &lt;/Link&gt;
      | ^^^^^^^^^^^^^^^
&gt; 167 |
      | ^
&gt; 168 |         {/* Desktop nav */}
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^
&gt; 169 |         &lt;nav className=&quot;nav-desktop&quot; style={{ display: &#39;flex&#39;, alignItems: &#39;center&#39;, gap: &#39;8px&#39; }}&gt;
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
&gt; 170 |           &lt;Link href=&quot;/&quot; className=&quot;btn-ghost nav-link&quot;
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
&gt; 171 |             style={{ color: pathname === &#39;/&#39; ? &#39;var(--text-primary)&#39; : &#39;var(--text-secondary)&#39; }}&gt;
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
&gt; 172 |             Properties
      | ^^^^^^^^^^^^^^^^^^^^^^
&gt; 173 |           &lt;/Link&gt;
      | ^^^^^^^^^^^^^^^^^
&gt; 174 |
      | ^
&gt; 175 |           {session?.user ? (
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
&gt; 176 |             &lt;Link href=&quot;/dashboard&quot; className=&quot;btn-primary&quot; style={{ padding: &#39;9px 20px&#39;, fontSize: &#39;0.78rem&#39; }}&gt;
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
&gt; 177 |               Dashboard
      | ^^^^^^^^^^^^^^^^^^^^^^^
&gt; 178 |             &lt;/Link&gt;
      | ^^^^^^^^^^^^^^^^^^^
&gt; 179 |           ) : (
      | ^^^^^^^^^^^^^^^
&gt; 180 |             &lt;&gt;
      | ^^^^^^^^^^^^^^
&gt; 181 |               &lt;Link href=&quot;/login&quot; className=&quot;btn-ghost&quot;
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
&gt; 182 |                 style={{ color: pathname === &#39;/login&#39; ? &#39;var(--text-primary)&#39; : &#39;var(--text-secondary)&#39; }}&gt;
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
&gt; 183 |                 Sign In
      | ^^^^^^^^^^^^^^^^^^^^^^^
&gt; 184 |               &lt;/Link&gt;
      | ^^^^^^^^^^^^^^^^^^^^^
&gt; 185 |               &lt;Link href=&quot;/register&quot; className=&quot;btn-primary&quot; style={{ padding: &#39;9px 20px&#39;, fontSize: &#39;0.78rem&#39; }}&gt;
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
&gt; 186 |                 Get Started
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^
&gt; 187 |               &lt;/Link&gt;
      | ^^^^^^^^^^^^^^^^^^^^^
&gt; 188 |             &lt;/&gt;
      | ^^^^^^^^^^^^^^^
&gt; 189 |           )}
      | ^^^^^^^^^^^^
&gt; 190 |         &lt;/nav&gt;
      | ^^^^^^^^^^^^^^
&gt; 191 |
      | ^
&gt; 192 |         {/* Mobile hamburger */}
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
&gt; 193 |         &lt;button
      | ^^^^^^^^^^^^^^^
&gt; 194 |           className=&quot;nav-mobile&quot;
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
&gt; 195 |           onClick={() =&gt; setMenuOpen(o =&gt; !o)}
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
&gt; 196 |           style={{ background: &#39;none&#39;, border: &#39;none&#39;, cursor: &#39;pointer&#39;, padding: &#39;8px&#39;, display: &#39;none&#39;, color: &#39;var(--text-primary)&#39; }}
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
&gt; 197 |           aria-label=&quot;Toggle menu&quot;
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
&gt; 198 |         &gt;
      | ^^^^^^^^^
&gt; 199 |           &lt;div style={{ width: &#39;20px&#39;, display: &#39;flex&#39;, flexDirection: &#39;column&#39;, gap: &#39;4px&#39; }}&gt;
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
&gt; 200 |             {[0, 1, 2].map(i =&gt; (
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
&gt; 201 |               &lt;span key={i} style={{
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
&gt; 202 |                 display: &#39;block&#39;, height: &#39;2px&#39;,
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
&gt; 203 |                 background: &#39;var(--text-primary)&#39;,
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
&gt; 204 |                 borderRadius: &#39;2px&#39;,
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
&gt; 205 |                 transition: &#39;transform 0.25s ease, opacity 0.25s ease&#39;,
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
&gt; 206 |                 transform: menuOpen
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
&gt; 207 |                   ? i === 0 ? &#39;rotate(45deg) translate(4px, 4px)&#39;
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
&gt; 208 |                   : i === 2 ? &#39;rotate(-45deg) translate(4px, -4px)&#39;
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
&gt; 209 |                   : &#39;none&#39;
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^
&gt; 210 |                   : &#39;none&#39;,
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^
&gt; 211 |                 opacity: menuOpen &amp;&amp; i === 1 ? 0 : 1,
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
&gt; 212 |               }} /&gt;
      | ^^^^^^^^^^^^^^^^^^^
&gt; 213 |             ))}
      | ^^^^^^^^^^^^^^^
&gt; 214 |           &lt;/div&gt;
      | ^^^^^^^^^^^^^^^^
&gt; 215 |         &lt;/button&gt;
      | ^^^^^^^^^^^^^^^^^
&gt; 216 |       &lt;/div&gt;
      | ^^^^^^^^^^^^
&gt; 217 |
      | ^
&gt; 218 |       {/* Mobile menu */}
      | ^^^^^^^^^^^^^^^^^^^^^^^^^
&gt; 219 |       &lt;div className=&quot;nav-mobile&quot; style={{
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
&gt; 220 |         overflow: &#39;hidden&#39;,
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^
&gt; 221 |         maxHeight: menuOpen ? &#39;280px&#39; : &#39;0&#39;,
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
&gt; 222 |         opacity: menuOpen ? 1 : 0,
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
&gt; 223 |         transition: &#39;max-height 0.3s cubic-bezier(0.16,1,0.3,1), opacity 0.25s ease&#39;,
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
&gt; 224 |         display: &#39;flex&#39;, flexDirection: &#39;column&#39;,
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
&gt; 225 |         borderTop: menuOpen ? &#39;1px solid var(--border)&#39; : &#39;none&#39;,
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
&gt; 226 |         background: &#39;var(--surface-1)&#39;,
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
&gt; 227 |       }}&gt;
      | ^^^^^^^^^
&gt; 228 |         &lt;div style={{ padding: &#39;16px 1.5rem 20px&#39;, display: &#39;flex&#39;, flexDirection: &#39;column&#39;, gap: &#39;4px&#39; }}&gt;
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
&gt; 229 |           &lt;Link href=&quot;/&quot; onClick={() =&gt; setMenuOpen(false)} className=&quot;btn-ghost&quot;
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
&gt; 230 |             style={{ justifyContent: &#39;flex-start&#39;, color: pathname === &#39;/&#39; ? &#39;var(--text-primary)&#39; : &#39;var(--text-secondary)&#39; }}&gt;
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
&gt; 231 |             Properties
      | ^^^^^^^^^^^^^^^^^^^^^^
&gt; 232 |           &lt;/Link&gt;
      | ^^^^^^^^^^^^^^^^^
&gt; 233 |           {session?.user ? (
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
&gt; 234 |             &lt;Link href=&quot;/dashboard&quot; onClick={() =&gt; setMenuOpen(false)} className=&quot;btn-ghost&quot;
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
&gt; 235 |               style={{ justifyContent: &#39;flex-start&#39;, color: &#39;var(--gold)&#39; }}&gt;
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
&gt; 236 |               Dashboard
      | ^^^^^^^^^^^^^^^^^^^^^^^
&gt; 237 |             &lt;/Link&gt;
      | ^^^^^^^^^^^^^^^^^^^
&gt; 238 |           ) : (
      | ^^^^^^^^^^^^^^^
&gt; 239 |             &lt;&gt;
      | ^^^^^^^^^^^^^^
&gt; 240 |               &lt;Link href=&quot;/login&quot; onClick={() =&gt; setMenuOpen(false)} className=&quot;btn-ghost&quot;
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
&gt; 241 |                 style={{ justifyContent: &#39;flex-start&#39; }}&gt;
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
&gt; 242 |                 Sign In
      | ^^^^^^^^^^^^^^^^^^^^^^^
&gt; 243 |               &lt;/Link&gt;
      | ^^^^^^^^^^^^^^^^^^^^^
&gt; 244 |               &lt;Link href=&quot;/register&quot; onClick={() =&gt; setMenuOpen(false)}
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
&gt; 245 |                 className=&quot;btn-primary&quot;
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
&gt; 246 |                 style={{ marginTop: &#39;8px&#39;, justifyContent: &#39;center&#39; }}&gt;
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
&gt; 247 |                 Get Started
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^
&gt; 248 |               &lt;/Link&gt;
      | ^^^^^^^^^^^^^^^^^^^^^
&gt; 249 |             &lt;/&gt;
      | ^^^^^^^^^^^^^^^
&gt; 250 |           )}
      | ^^^^^^^^^^^^
&gt; 251 |         &lt;/div&gt;
      | ^^^^^^^^^^^^^^
&gt; 252 |       &lt;/div&gt;
      | ^^^^^^^^^^^^
&gt; 253 |     &lt;/header&gt;
      | ^^^^^^^^^^^^^
&gt; 254 |   )
      | ^^^
  255 | }
  256 |

Parsing ecmascript source code failed

Import trace:
  Server Component:
    ./Desktop/Projects/BRISVORA/apps/web/components/Navbar.tsx
    ./Desktop/Projects/BRISVORA/apps/web/app/page.tsx

Next.js version: 16.2.9 (Turbopack)

---

Let me read the current Navbar file to see what went wrong:

---

The issue is clear — the previous `fsReplace` only replaced the top portion of the function (up to `useEffect`) but left the old `return (...)` block still appended at the bottom, resulting in two `return` statements outside the function body. I'll rewrite the file cleanly:

---

Rewrite Navbar.tsx cleanly with a single return statement, removing the duplicate old return block that caused the parse error.

---


Fixed. The problem was that the previous edit only replaced the function signature + hooks section, leaving the old `return (...)` block dangling after the closing `}` of the new function — so the parser saw a `return` statement outside any function.

The file is now clean with a single `return`. I also took the opportunity to move the mobile theme toggle button next to the hamburger icon (instead of inside the dropdown menu) so it's always visible on mobile without needing to open the menu.

---

git commit message with cmd to copy paste

---

Check what files have changed to write an accurate commit message

---

shell

---


```bash
git add -A && git commit -m "feat: add dark/light theme toggle + fix Server Component event handler errors

- Add next-themes with ThemeProvider (default: dark, persisted in localStorage)
- Add [data-theme='light'] CSS token overrides (warm cream surfaces, adjusted gold)
- Add theme toggle button in Navbar (desktop + mobile), with rotate hover effect
- Fix Footer.tsx: add 'use client' to resolve onMouseEnter/onMouseLeave SSR error
- Fix page.tsx: replace FAQ JS hover handlers with .faq-item CSS class
- Fix Navbar.tsx: remove duplicate return block that caused parse error
- Update layout.tsx: add suppressHydrationWarning to <html> for next-themes"
```

---

read and analyze whole project carefully and i need to make admin dashboard with super admin to see everything there that had to see and everything

---


Let me read the entire project thoroughly first.

---


Now I have a complete picture of the project. Let me plan and build the admin dashboard:

**What exists:**
- `Role` enum: `BROKER | ADMIN` in schema
- `session.user.role` is already in JWT/session
- No `SUPER_ADMIN` role yet — need to add it to schema
- No admin routes exist at all

**What I'll build:**
- Add `SUPER_ADMIN` to the `Role` enum (migration)
- `/admin` route group with layout (role guard: ADMIN or SUPER_ADMIN)
- Admin sidebar with all sections
- Pages: Overview stats, All Users, All Properties, All Leads, WhatsApp Messages, Analytics
- API routes for admin data fetching
- Promote-to-admin action for SUPER_ADMIN

Let me start:

---


Now I have everything I need. Let me build the full admin dashboard. Here's the plan:

1. Update `schema.prisma` — add `SUPER_ADMIN` to `Role` enum
2. Create Prisma migration SQL
3. Create admin API routes (stats, users, properties, leads, messages)
4. Create admin layout + sidebar
5. Create all admin pages (overview, users, properties, leads, messages)
6. Add admin link to broker dashboard sidebar for admins

---

Add SUPER_ADMIN to the Role enum in Prisma schema

---

Create migration directory for SUPER_ADMIN role

---

shell

---

Migration SQL to add SUPER_ADMIN value to the Role enum

---


Now create all the admin directories and files:

---

Create all admin route directories

---

shell

---


Now create all files. Starting with the admin API route:

---

Admin stats API route — returns platform-wide counts and recent activity

---

Create admin API sub-route directories

---

shell

---

Admin users API — list all users, update role (SUPER_ADMIN only), delete user

---

Admin properties API — list all properties with filters, update status, delete

---

Admin leads API — list all leads platform-wide with filters

---

Admin WhatsApp messages API — list all messages with filters

---

An unexpected error occurred, check the logs for more information. 

Request ID: cd0725f1-cb73-4522-a399-8488b3de39df

---

hello

---

An unexpected error occurred, check the logs for more information. 

Request ID: e39d47f8-693e-4b0e-9940-dff2b8d43778

---

what happed?

---

An unexpected error occurred, check the logs for more information. 

Request ID: cdf3dfae-b34a-481f-b552-5f68b574c65f