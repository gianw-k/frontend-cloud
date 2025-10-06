import React, { useState, useEffect, useRef } from 'react';

const baseUrlInscripciones = 'http://microservicios-lb-635095926.us-east-1.elb.amazonaws.com/inscripciones';

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

function Inscripciones() {
  const [inscripciones, setInscripciones] = useState([]);
  const [estudianteId, setEstudianteId] = useState('');
  const [cursoId, setCursoId] = useState('');
  const [loading, setLoading] = useState(false);
  const isMountedRef = useRef(true);

  const listarInscripciones = async () => {
    if (!isMountedRef.current) return;
    
    setLoading(true);
    try {
      const res = await fetch(baseUrlInscripciones);
      if (!res.ok) {
        throw new Error('Error al cargar inscripciones');
      }
      const data = await res.json();
      
      if (isMountedRef.current) {
        setInscripciones(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error('Error:', error);
      if (isMountedRef.current) {
        setInscripciones([]);
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  };

  const crearInscripcion = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(baseUrlInscripciones, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estudianteId, cursoId }),
      });
      if (!res.ok) {
        throw new Error('Error al crear inscripción');
      }
      alert('Inscripción creada exitosamente');
      setEstudianteId('');
      setCursoId('');
      listarInscripciones();
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const actualizarProgreso = async (id, nuevoProgreso) => {
    try {
      const res = await fetch(`${baseUrlInscripciones}/${id}/progreso`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ progreso: { porcentaje: nuevoProgreso } }),
      });
      if (!res.ok) {
        throw new Error('Error al actualizar progreso');
      }
      listarInscripciones();
    } catch (error) {
      alert('Error al actualizar progreso: ' + error.message);
    }
  };

  const verDetalles = (inscripcion) => {
    alert(`Detalles:\nID: ${inscripcion._id || inscripcion.id}\nEstudiante: ${inscripcion.estudianteId}\nCurso: ${inscripcion.cursoId}\nProgreso: ${inscripcion.progreso?.porcentaje || 0}%`);
  };

  useEffect(() => {
    isMountedRef.current = true;
    listarInscripciones();
    
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return (
    <div>
      <h2>Inscripciones</h2>
      <button 
        style={{ backgroundColor: '#007bff', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer' }} 
        onClick={listarInscripciones}
        disabled={loading}
      >
        {loading ? 'Cargando...' : 'Listar Inscripciones'}
      </button>
      
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Estudiante ID</th>
            <th style={thStyle}>Curso ID</th>
            <th style={thStyle}>Progreso</th>
            <th style={thStyle}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>Cargando...</td>
            </tr>
          ) : inscripciones.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>No hay inscripciones</td>
            </tr>
          ) : (
            inscripciones.map((inscripcion, index) => (
              <tr key={inscripcion._id || inscripcion.id || index} style={index % 2 ? trHoverStyle : {}}>
                <td style={tdStyle}>{inscripcion._id || inscripcion.id}</td>
                <td style={tdStyle}>{inscripcion.estudianteId}</td>
                <td style={tdStyle}>{inscripcion.cursoId}</td>
                <td style={tdStyle}>{inscripcion.progreso?.porcentaje || 0}%</td>
                <td style={tdStyle}>
                  <button 
                    style={{ backgroundColor: '#ffc107', color: 'black', padding: '6px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '5px' }} 
                    onClick={() => verDetalles(inscripcion)}
                  >
                    Ver
                  </button>
                  <button 
                    style={{ backgroundColor: '#28a745', color: 'white', padding: '6px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '5px' }} 
                    onClick={() => actualizarProgreso(inscripcion._id || inscripcion.id, Math.min(100, (inscripcion.progreso?.porcentaje || 0) + 10))}
                  >
                    +10%
                  </button>
                  <button 
                    style={{ backgroundColor: '#dc3545', color: 'white', padding: '6px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer' }} 
                    onClick={() => alert('Función no disponible')}
                    disabled
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <h3>Crear Inscripción</h3>
      <form onSubmit={crearInscripcion} style={{ marginTop: '20px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label>Estudiante ID: </label>
          <input 
            value={estudianteId} 
            onChange={(e) => setEstudianteId(e.target.value)} 
            required 
            style={{ padding: '6px', width: '100%' }} 
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Curso ID: </label>
          <input 
            value={cursoId} 
            onChange={(e) => setCursoId(e.target.value)} 
            required 
            style={{ padding: '6px', width: '100%' }} 
          />
        </div>
        <button 
          type="submit" 
          style={{ backgroundColor: '#007bff', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Crear Inscripción
        </button>
      </form>
    </div>
  );
}

export default Inscripciones;