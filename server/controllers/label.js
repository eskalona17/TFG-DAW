import Label from '../models/Label.js'

export async function getLabels (req, res) {
  try {
    const labels = await Label.find()
    res.status(200).json(labels)
  } catch (error) {
    console.error('Error:', error.message)
    res.status(500).json({ error: 'Internal server error' })
  }
}
