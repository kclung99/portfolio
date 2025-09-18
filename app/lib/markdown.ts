import fs from 'fs'
import path from 'path'

export function getMarkdownContent(category: string, slug: string): string | null {
  try {
    const contentDir = path.join(process.cwd(), 'content', category)
    const filePath = path.join(contentDir, `${slug}.md`)

    if (!fs.existsSync(filePath)) {
      return null
    }

    return fs.readFileSync(filePath, 'utf8')
  } catch (error) {
    console.error('Error reading markdown file:', error)
    return null
  }
}