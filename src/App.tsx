import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MainUserLayout from './layout/MainUserLayout';
import NotFoundPage from './pages/NotFoundPage';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import SchoolDetails from './pages/SchoolDetails';

const queryClient = new QueryClient();

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<MainUserLayout />} >
          <Route index element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />

          <Route
            path="/search"
            element={<SearchPage />}
          />

          <Route
            path="/school/:id"
            element={<SchoolDetails />}
          />
        </Route >
      </>
    )
  );
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
