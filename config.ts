import { z } from 'zod'

const configSchema = z.object({
    BACKEND_API: z.string(),
    SERVER_API: z.string()
})

const configProject = configSchema.safeParse({
    BACKEND_API: process.env.NEXT_PUBLIC|| "http://localhost:5000/api",
    SERVER_API: process.env.SERVER_API || "http://localhost:3001/api"
  })
  if (!configProject.success) {
    console.error(configProject.error.issues)
    throw new Error('Các giá trị khai báo trong file .env không hợp lệ')
  }
  
  const envConfig = configProject.data
  export default envConfig