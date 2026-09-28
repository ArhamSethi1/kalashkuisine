<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Responsive hero and gallery photos use pre-sized WebP variants on the existing Lovable assets CDN, selected with `srcSet`/`sizes`; the CDN image path itself does not support on-demand resizing, so pre-generated variants avoid large downloads.
- About videos warm their first two seconds with CDN byte-range requests when About enters the viewport; keep playback URLs as MP4 with WebM fallback for iOS compatibility.
