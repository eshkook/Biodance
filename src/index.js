import ReactDOM from 'react-dom/client'
import App from "./App.js"
import "./styles/index.css"
import { BrowserRouter } from 'react-router-dom'
// import { HashRouter } from 'react-router-dom' // alternative to BrowserRouter. makes the routes be hashes rather than actual urls. 
// good for shared servers where you can't change url
// import { StaticRouter } from 'react-router-dom/server' // for SSR
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools' 

const queryClient = new QueryClient({
  // will make newly fetched data 'fresh' for 5 seconds before becoming 'stale' 
  // When data is fresh, React Query will not attempt to refetch it 
  // when components re-render or when new components that need the same data are mounted. 
  defaultOptions: { 
    queries: {
      staleTime: 5000  
    }
   }
  })

// Get the root DOM node
const root = ReactDOM.createRoot(document.getElementById('root'))

// Render the App component into the root DOM node
root.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </BrowserRouter>
)


