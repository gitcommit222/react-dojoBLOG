import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

const Create = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('mario');
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();

  const handleClick = (e) => {
    e.preventDefault();
    const blog = { title, body, author};

    setIsPending(true)

    setTimeout(() =>{
       fetch('http://localhost:3000/blogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(blog)
      }).then(() => {
        setIsPending(false);
        history.push('/');
      }).catch((err) => {
        return(err.message)
      })
    }, 2000)

  }

  return (
    <div className='create'>
      <h2>Add New Blog</h2>
      <form onSubmit={handleClick}>
        <label>Blog Title:</label>
        <input 
          type="text" 
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Blog body:</label>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <label>Blog author:</label>
        <select
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        >
          <option value='mario'>Mario</option>
          <option value='yoshi'>Yoshi</option>
        </select>
        { !isPending && <button>Add Blog</button> }
        { isPending && <button disabled>Adding Blog...</button> }
      </form>
    </div>
  )
}

export default Create
