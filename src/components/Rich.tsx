import katex from 'katex'
import 'katex/dist/katex.min.css'
import { Fragment, useMemo } from 'react'

// Tiny inline markup: $math$, **bold**, *italic*, `code`, line breaks.
function renderMath(src: string) {
  try { return katex.renderToString(src, { throwOnError: false, strict: 'ignore' }) } catch { return src }
}

export function Rich({ text, block = false }: { text: string; block?: boolean }) {
  const nodes = useMemo(() => {
    const out: JSX.Element[] = []
    const parts = text.split(/(\$[^$]+\$)/g)
    parts.forEach((part, i) => {
      if (part.startsWith('$') && part.endsWith('$') && part.length > 2) {
        out.push(<span key={i} dangerouslySetInnerHTML={{ __html: renderMath(part.slice(1, -1)) }} />)
      } else {
        const lines = part.split('\n')
        lines.forEach((ln, j) => {
          const segs = ln.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g)
          out.push(
            <Fragment key={`${i}-${j}`}>
              {j > 0 && <br />}
              {segs.map((sg, k) =>
                sg.startsWith('**') ? <strong key={k}>{sg.slice(2, -2)}</strong>
                : sg.startsWith('`') ? <code key={k}>{sg.slice(1, -1)}</code>
                : sg.startsWith('*') && sg.length > 2 ? <em key={k}>{sg.slice(1, -1)}</em>
                : <Fragment key={k}>{sg}</Fragment>)}
            </Fragment>,
          )
        })
      }
    })
    return out
  }, [text])
  return block ? <div className="rich">{nodes}</div> : <span className="rich">{nodes}</span>
}
