import React, { useState } from 'react';

const baseUrlEstudiantes = 'http://localhost:8020';

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

function Estudiantes() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [pais, setPais] = useState('');

  const listarEstudiantes = async () => {
    try {
      const res = await fetch(`${baseUrlEstudiantes}/estudiantes`);
      const data = await res.json();
      const estudiantesData = data.content || data;
      setEstudiantes(estudiantesData);
    } catch (error) {
      alert('Error al cargar estudiantes: ' + error.message);
    }
  };

  const crearEstudiante = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${baseUrlEstudiantes}/estudiantes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email, telefono, pais }),
      });
      if (!res.ok) throw new Error('Error al crear estudiante');
      alert('Estudiante creado exitosamente');
      setNombre('');
      setEmail('');
      setTelefono('');
      setPais('');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h2>Estudiantes</h2>
      <button style={{ backgroundColor: '#007bff', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer' }} onClick={listarEstudiantes}>Listar Estudiantes</button>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Nombre</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Teléfono</th>
            <th style={thStyle}>País</th>
          </tr>
        </thead>
        <tbody>
          {estudiantes.map((estudiante, index) => (
            <tr key={estudiante.id} style={index % 2 ? trHoverStyle : {}}>
              <td style={tdStyle}>{estudiante.id}</td>
              <td style={tdStyle}>{estudiante.nombre}</td>
              <td style={tdStyle}>{estudiante.email}</td>
              <td style={tdStyle}>{estudiante.telefono}</td>
              <td style={tdStyle}>{estudiante.pais}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Crear Estudiante</h3>
      <form onSubmit={crearEstudiante} style={{ marginTop: '20px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label>Nombre: </label>
          <input value={nombre} onChange={(e) => setNombre(e.target.value)} required style={{ padding: '6px', width: '100%' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Email: </label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ padding: '6px', width: '100%' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Teléfono: </label>
          <input value={telefono} onChange={(e) => setTelefono(e.target.value)} style={{ padding: '6px', width: '100%' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>País: </label>
          <input value={pais} onChange={(e) => setPais(e.target.value)} style={{ padding: '6px', width: '100%' }} />
        </div>
        <button type="submit" style={{ backgroundColor: '#007bff', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Crear Estudiante</button>
      </form>
    </div>
  );
}

export default Estudiantes;
