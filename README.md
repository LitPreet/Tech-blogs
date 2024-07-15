
# Tech Blogs

Tech Blogs is a dynamic SaaS platform where users can post their blogs and share them with a global audience. Our user-friendly interface ensures that you can easily create, edit, and manage your blog posts.

## 🌐Demo

Explore the live project - https://tech-blogs2.vercel.app/


## 🚀Key Features
- Blog Posting: Users can create and publish blog posts with rich text formatting and multimedia content, including code snippets for sharing technical insights.

- Dashboard: Manage your blog posts effortlessly with a comprehensive dashboard. You can edit, delete, and publish posts with ease.

- Premium Content: Offer premium blog content that is accessible to readers after payment, providing a revenue stream for content creators.

- Code Snippets: Easily share code snippets within your blogs to illustrate programming concepts, tutorials, or technical solutions.

- SEO Optimization: Built-in SEO tools to help your blogs reach a wider audience.



## 🛠️Tech Stack
- Next.js 14
- TypeScript
- Tailwind CSS
- Supabase
- Supabase auth for Authentication
- Stripe payment gateway
- Shadcn UI for reusable components
- React Icons
- Zod for Form validation
- Next themes for theme management
- Vercel for deployment
## 🏁 Get Started
To get this project up and running in your development environment, follow these step-by-step instructions.
## 📝 Prerequisites
In order to install and run this project locally, you would need to have the following installed on your local machine.
- [Node js](https://nodejs.org/en/)
- [NPM](https://docs.npmjs.com/getting-started)
- [Git](https://git-scm.com/downloads)
## ⚙️ Installation and Run Locally

#### step 1
Download or clone this repo by using the link below:
```
https://github.com/LitPreet/Tech-blogs.git
```
#### step 2
Execute the following command in the root directory of the downloaded repo in order to install dependencies:
```
npm install
```
### step 3
Execute the following command in order to run the development server locally:
```
npm run dev
```
### step 4
Open http://localhost:3000 with your browser to see the result.
## 📜 Scripts
| Script       | Action         
| ------------- |:-------------
| ```npm install```      | Installs dependencies
| ```npm run dev```      | Starts local dev server at ```localhost:3000  ```  
| ```npm run build``` | Build your production site to ```./dist/```    
| ```npm run start``` | Start your production site locally
| ```npm run lint``` | Run ESLint |

## 🔒 Environment Variables
```
SITE_URL=https://your-site-url.com
SERVICE_ROLE=your-service-role
PRO_PRICE_ID=your-pro-price-id
STRIPE_SK_KEY=your-stripe-secret-key
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=your-stripe-public-key
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-url.com

```
## 🚀 Deployment
You can create an optimized production build with the following command:
```
npm run build
```
#### Deploy on Vercel
The easiest way to deploy this Next.js app is to use the Vercel Platform.
[Vercel Platform](https://vercel.com)
