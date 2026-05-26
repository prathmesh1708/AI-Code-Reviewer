import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import Prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/github-dark.css"
import axios from 'axios'
import './App.css'

function App() {
  const [code, setCode] = useState(`function sum() {\n  return 1 + 1\n}`)
  const [review, setReview] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    Prism.highlightAll()
  }, [])

  async function reviewCode() {
    if (!code.trim()) return
    setLoading(true)
    setReview('')
    try {
      const response = await axios.post('http://localhost:3000/ai/get-review', { code })
      setReview(response.data.review)
    } catch (err) {
      setReview('Error: ' + (err.response?.data?.message || err.message))
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => Prism.highlight(code, Prism.languages.javascript, "javascript")}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%"
              }}
            />
          </div>
          <div onClick={reviewCode} className="review">
            {loading ? 'Reviewing...' : 'Review'}
          </div>
        </div>
        <div className="right">
          {review
            ? <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
            : <p style={{ color: '#888', padding: '1rem' }}>Click Review to get AI feedback</p>
          }
        </div>
      </main>
    </>
  )
}

export default App
