import ReactDOM from 'react-dom/client'
import App from "./App.js"
// import "./styles/index.css"
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools' 
import store from './redux/store';
import { Provider } from 'react-redux'

const queryClient = new QueryClient({
  // will make newly fetched data 'fresh' for 5 seconds before becoming 'stale' 
  // When data is fresh, React Query will not attempt to refetch it 
  //     when components re-render or when new components that need the same data are mounted. 
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
  <Provider store={store}>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
        {/* <ReactQueryDevtools /> */}
      </QueryClientProvider>
    </BrowserRouter>
  </Provider>
)


