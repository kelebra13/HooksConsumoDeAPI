import { useState, useMemo, useCallback } from 'react';
import { useFetch } from './hooks/useFetch';
import { useDebounce } from './hooks/useDebounce';

function App() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  const { data: posts, loading, error } = useFetch('https://jsonplaceholder.typicode.com/posts');

  // Filtramos usando useMemo
  const filteredPosts = useMemo(() => {
    if (!posts) return [];
    return posts.filter(post => 
      post.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [posts, debouncedSearch]);

  // useCallback para la función de cambio
  const handleInputChange = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  if (loading) return <div className="spinner">Cargando publicaciones...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="container">
      <h1>Gestor de Publicaciones</h1>
      <input 
        type="text" 
        placeholder="Buscar por título..." 
        onChange={handleInputChange} 
      />
      
      <ul>
        {filteredPosts.map(post => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;