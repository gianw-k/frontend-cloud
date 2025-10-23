import React, { useState } from 'react';
import API_BASE_URL from '../config/api';

const baseUrlCursos = `${API_BASE_URL}/cursos`;

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: '10px',
};

const thStyle = {
  backgroundColor: '#007bff',
  color: 'white',
  padding: '8px',
  textAlign: 'left',
};

const tdStyle = {
  borderBottom: '1px solid #ddd',
  padding: '8px',
};

const trHoverStyle = {
  backgroundColor: '#f1f1f1',
};

function Cursos() {
  const [cursos, setCursos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [bio, setBio] = useState('');
  const [fotoUrl, setFotoUrl] = useState('');

  const listarCursos = async () => {
    try {
      const res = await fetch(`${baseUrlCursos}/cursos`);
      const data = await res.json();
      setCursos(data);
    } catch (error) {
      alert('Error al cargar cursos: ' + error.message);
    }
  };

  const crearInstructor = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${baseUrlCursos}/instructores`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, bio, foto_url: fotoUrl }),
      });
      if (!res.ok) throw new Error('Error al crear instructor');
      alert('Instructor creado exitosamente');
      setNombre('');
      setBio('');
      setFotoUrl('');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h2>Cursos</h2>
      <button style={{ backgroundColor: '#007bff', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer' }} onClick={listarCursos}>Listar Cursos</button>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Título</th>
            <th style={thStyle}>Descripción</th>
            <th style={thStyle}>Nivel</th>
            <th style={thStyle}>Estado</th>
          </tr>
        </thead>
        <tbody>
          {cursos.map((curso, index) => (
            <tr key={curso.id || curso.slug} style={index % 2 ? trHoverStyle : {}}>
              <td style={tdStyle}>{curso.id || curso.slug}</td>
              <td style={tdStyle}>{curso.titulo}</td>
              <td style={tdStyle}>{curso.descripcion}</td>
              <td style={tdStyle}>{curso.nivel}</td>
              <td style={tdStyle}>{curso.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Crear Instructor</h3>
      <form onSubmit={crearInstructor} style={{ marginTop: '20px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label>Nombre: </label>
          <input value={nombre} onChange={(e) => setNombre(e.target.value)} required style={{ padding: '6px', width: '100%' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Bio: </label>
          <input value={bio} onChange={(e) => setBio(e.target.value)} required style={{ padding: '6px', width: '100%' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Foto URL: </label>
          <input value={fotoUrl} onChange={(e) => setFotoUrl(e.target.value)} style={{ padding: '6px', width: '100%' }} />
        </div>
        <button type="submit" style={{ backgroundColor: '#007bff', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Crear Instructor</button>
      </form>
    </div>
  );
}

export default Cursos;
