import { useEffect, useMemo, useState } from 'react'
import './App.css'
import API_BASE_URL from './config/api'

const api = {
  cursos: {
    list: (params = '') => fetch(`${API_BASE_URL}/cursos${params}`).then(async r => {
      if (!r.ok) throw new Error(`HTTP ${r.status}: ${r.statusText}`)
      const text = await r.text()
      if (!text) return []
      try {
        return JSON.parse(text)
      } catch (e) {
        console.error('Failed to parse JSON:', text)
        throw new Error('Invalid JSON response')
      }
    }),
    get: (id) => fetch(`${API_BASE_URL}/cursos/${id}`).then(async r => {
      if (!r.ok) throw new Error(`HTTP ${r.status}: ${r.statusText}`)
      const text = await r.text()
      if (!text) return {}
      try {
        return JSON.parse(text)
      } catch (e) {
        console.error('Failed to parse JSON:', text)
        return {}
      }
    }),
    create: (body) => fetch('${API_BASE_URL}/cursos', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }).then(async r => {
      if (!r.ok) throw new Error(`HTTP ${r.status}: ${r.statusText}`)
      const text = await r.text()
      if (!text) return { success: true }
      try {
        return JSON.parse(text)
      } catch (e) {
        console.error('Failed to parse JSON:', text)
        return { success: true, raw: text }
      }
    }),
    update: (id, body) => fetch(`${API_BASE_URL}/cursos/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }).then(async r => {
      if (!r.ok) throw new Error(`HTTP ${r.status}: ${r.statusText}`)
      const text = await r.text()
      if (!text) return { success: true }
      try {
        return JSON.parse(text)
      } catch (e) {
        console.error('Failed to parse JSON:', text)
        return { success: true, raw: text }
      }
    }),
    delete: (id) => fetch(`${API_BASE_URL}/cursos/${id}`, { method: 'DELETE' }).then(async r => {
      if (!r.ok) throw new Error(`HTTP ${r.status}: ${r.statusText}`)
      const text = await r.text()
      if (!text) return { success: true }
      try {
        return JSON.parse(text)
      } catch (e) {
        console.error('Failed to parse JSON:', text)
        return { success: true, raw: text }
      }
    }),
    getLecciones: (id) => fetch(`${API_BASE_URL}/cursos/${id}/lecciones`).then(async r => {
      if (!r.ok) throw new Error(`HTTP ${r.status}: ${r.statusText}`)
      const text = await r.text()
      if (!text) return []
      try {
        return JSON.parse(text)
      } catch (e) {
        console.error('Failed to parse JSON:', text)
        return []
      }
    }),
  },
  estudiantes: {
    list: (params = '') => fetch(`${API_BASE_URL}/estudiantes${params}`).then(async r => {
      if (!r.ok) throw new Error(`HTTP ${r.status}: ${r.statusText}`)
      const text = await r.text()
      if (!text) return { content: [], totalElements: 0 }
      try {
        return JSON.parse(text)
      } catch (e) {
        console.error('Failed to parse JSON:', text)
        return { content: [], totalElements: 0 }
      }
    }),
    get: (id) => fetch(`/api/estudiantes/${id}`).then(async r => {
      if (!r.ok) throw new Error(`HTTP ${r.status}: ${r.statusText}`)
      return r.json()
    }),
    create: (body) => fetch('${API_BASE_URL}/estudiantes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }).then(async r => {
      if (!r.ok) throw new Error(`HTTP ${r.status}: ${r.statusText}`)
      const text = await r.text()
      if (!text) return { success: true }
      try {
        return JSON.parse(text)
      } catch (e) {
        console.error('Failed to parse JSON:', text)
        return { success: true, raw: text }
      }
    }),
    update: (id, body) => fetch(`/api/estudiantes/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }).then(async r => {
      if (!r.ok) throw new Error(`HTTP ${r.status}: ${r.statusText}`)
      return r.json()
    }),
    delete: (id) => fetch(`/api/estudiantes/${id}`, { method: 'DELETE' }).then(r => {
      if (!r.ok) throw new Error(`HTTP ${r.status}: ${r.statusText}`)
      return r
    }),
  },
  inscripciones: {
    list: () => fetch('${API_BASE_URL}/inscripciones').then(async r => {
      if (!r.ok) throw new Error(`HTTP ${r.status}: ${r.statusText}`)
      const text = await r.text()
      if (!text) return []
      try {
        return JSON.parse(text)
      } catch (e) {
        console.error('Failed to parse JSON:', text)
        return []
      }
    }),
    create: (body) => fetch('${API_BASE_URL}/inscripciones', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }).then(async r => {
      if (!r.ok) throw new Error(`HTTP ${r.status}: ${r.statusText}`)
      const text = await r.text()
      if (!text) return { success: true }
      try {
        return JSON.parse(text)
      } catch (e) {
        console.error('Failed to parse JSON:', text)
        return { success: true, raw: text }
      }
    }),
    updateProgreso: (id, body) => fetch(`/api/inscripciones/${id}/progreso`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }).then(async r => {
      if (!r.ok) throw new Error(`HTTP ${r.status}: ${r.statusText}`)
      const text = await r.text()
      if (!text) return { success: true }
      try {
        return JSON.parse(text)
      } catch (e) {
        console.error('Failed to parse JSON:', text)
        return { success: true, raw: text }
      }
    }),
  },
  agregador: {
    estadisticas: () => fetch('${API_BASE_URL}/agregador/dashboard/estadisticas').then(async r => {
      if (!r.ok) throw new Error(`HTTP ${r.status}: ${r.statusText}`)
      const text = await r.text()
      if (!text) return { total_estudiantes: 0, total_cursos: 0, total_inscripciones: 0, inscripciones_activas: 0 }
      try {
        return JSON.parse(text)
      } catch (e) {
        console.error('Failed to parse JSON:', text)
        return { total_estudiantes: 0, total_cursos: 0, total_inscripciones: 0, inscripciones_activas: 0 }
      }
    }),
    estudianteCompleto: (id) => fetch(`${API_BASE_URL}/agregador/estudiantes/${id}/detalles-completos`).then(async r => {
      if (!r.ok) throw new Error(`HTTP ${r.status}: ${r.statusText}`)
      return r.json()
    }),
    cursoCompleto: (id) => fetch(`${API_BASE_URL}/agregador/cursos/${id}/informacion-completa`).then(async r => {
      if (!r.ok) throw new Error(`HTTP ${r.status}: ${r.statusText}`)
      return r.json()
    }),
    cursosPopulares: () => fetch('${API_BASE_URL}/agregador/cursos/populares').then(async r => {
      if (!r.ok) throw new Error(`HTTP ${r.status}: ${r.statusText}`)
      const text = await r.text()
      if (!text) return []
      try {
        return JSON.parse(text)
      } catch (e) {
        console.error('Failed to parse JSON:', text)
        return []
      }
    }),
    estadisticasProgreso: () => fetch('${API_BASE_URL}/agregador/inscripciones/estadisticas-progreso').then(async r => {
      if (!r.ok) throw new Error(`HTTP ${r.status}: ${r.statusText}`)
      return r.json()
    }),
    health: () => fetch('${API_BASE_URL}/agregador/health').then(async r => {
      if (!r.ok) throw new Error(`HTTP ${r.status}: ${r.statusText}`)
      return r.json()
    }),
  }
}

function CursosSection() {
  const [cursos, setCursos] = useState([])
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ slug: '', titulo: '', descripcion: '', nivel: 'beginner', estado: 'borrador', duracion_min: 0 })
  const [filters, setFilters] = useState({ estado: '', nivel: '' })
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)

  const query = useMemo(() => {
    const qs = new URLSearchParams()
    if (filters.estado) qs.set('estado', filters.estado)
    if (filters.nivel) qs.set('nivel', filters.nivel)
    qs.set('page', '1')
    qs.set('size', '100')
    const str = qs.toString()
    return str ? `?${str}` : ''
  }, [filters])

  const load = async () => {
    setLoading(true)
    try {
      console.log('Loading courses with query:', query)
      const data = await api.cursos.list(query)
      console.log('Courses data received:', data)
      const list = (Array.isArray(data) ? data : [])
      const filtered = search
        ? list.filter(c => (c.titulo || '').toLowerCase().includes(search.toLowerCase()))
        : list
      setCursos(filtered)
      if (filtered.length && (!selected || !filtered.find(c => c.id === selected.id))) setSelected(filtered[0])
    } catch (error) {
      console.error('Error loading courses:', error)
      alert('Error al cargar cursos: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [query])

  const submit = async (e) => {
    e.preventDefault()
    try {
      const payload = {
        slug: form.slug,
        titulo: form.titulo,
        descripcion: form.descripcion || undefined,
        nivel: form.nivel,
        estado: form.estado,
        duracion_min: Number(form.duracion_min || 0)
      }
      console.log('Creating course with payload:', payload)
      const result = await api.cursos.create(payload)
      console.log('Course created successfully:', result)
      setForm({ slug: '', titulo: '', descripcion: '', nivel: 'beginner', estado: 'borrador', duracion_min: 0 })
      load()
    } catch (error) {
      console.error('Error creating course:', error)
      alert('Error al crear el curso: ' + error.message)
    }
  }

  const publicar = async (curso) => {
    try {
      console.log('Publicando curso:', curso);
      await api.cursos.update(curso.id, { ...curso, estado: 'publicado' });
      alert('Curso publicado exitosamente');
      load();
    } catch (error) {
      console.error('Error publicando curso:', error);
      alert('Error al publicar curso: ' + error.message);
    }
  }

  const eliminar = async (id) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este curso?')) return;
    
    try {
      console.log('Eliminando curso:', id);
      await api.cursos.delete(id);
      alert('Curso eliminado exitosamente');
      load();
    } catch (error) {
      console.error('Error eliminando curso:', error);
      alert('Error al eliminar curso: ' + error.message);
    }
  }

  const verDetalles = async (curso) => {
    try {
      console.log('Obteniendo detalles del curso:', curso);
      // Intentar obtener detalles del curso
      let cursoDetalle = curso; // Usar los datos que ya tenemos
      
      // Intentar obtener lecciones si el endpoint existe
      try {
        const lecciones = await api.cursos.getLecciones(curso.id);
        cursoDetalle = { ...cursoDetalle, lecciones };
      } catch (leccionesError) {
        console.log('No se pudieron cargar las lecciones:', leccionesError);
        cursoDetalle = { ...cursoDetalle, lecciones: [] };
      }
      
      setSelected(cursoDetalle);
    } catch (error) {
      console.error('Error cargando detalles:', error);
      // Si falla, al menos mostrar los datos básicos que tenemos
      setSelected(curso);
    }
  }

  return (
    <div className="section">
      <div className="section-header">
        <h2 className="section-title">📚 Gestión de Cursos</h2>
        <p className="section-subtitle">Crea, edita y administra tus cursos de manera eficiente</p>
      </div>
      <div className="section-body">
        <div className="toolbar">
          <div className="toolbar-left">
            <button className="btn" onClick={() => { setFilters({ estado: '', nivel: '' }); setSearch(''); load() }}>Todos</button>
            <button className="btn" onClick={() => setFilters({ ...filters, estado: 'publicado' })}>Publicados</button>
            <button className="btn" onClick={() => setFilters({ ...filters, estado: 'borrador' })}>Borradores</button>
            <button className="btn btn-primary" onClick={(e) => { e.preventDefault(); document.getElementById('slug-input')?.focus() }}>+ Nuevo Curso</button>
          </div>
          <div className="toolbar-right">
            <input className="input search" placeholder="Buscar cursos..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>

        <div className="grid grid-2">
          <div>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Título</th>
                    <th>Nivel</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan={4} className="loading">Cargando...</td></tr>
                  ) : cursos.length === 0 ? (
                    <tr><td colSpan={4} className="empty">No hay cursos</td></tr>
                  ) : (
                    cursos.map(c => (
                      <tr key={c.id}>
                        <td>{c.titulo || c.slug}</td>
                        <td>{c.nivel}</td>
                        <td>
                          <span className={`status status-${c.estado}`}>{c.estado}</span>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: 8 }}>
                            <button className="btn btn-warning" onClick={() => verDetalles(c)}>Ver</button>
                            <button className="btn btn-success" onClick={() => publicar(c)} disabled={c.estado === 'publicado'}>Publicar</button>
                            <button className="btn btn-danger" onClick={() => eliminar(c.id)}>Eliminar</button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Crear Nuevo Curso</h3>
              </div>
              <form onSubmit={submit} className="form">
                <div className="form-group">
                  <label>Slug</label>
                  <input id="slug-input" className="input" required placeholder="curso-slug" value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Título</label>
                  <input className="input" required placeholder="Título del curso" value={form.titulo} onChange={e => setForm({ ...form, titulo: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Descripción</label>
                  <input className="input" placeholder="Descripción del curso" value={form.descripcion} onChange={e => setForm({ ...form, descripcion: e.target.value })} />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Nivel</label>
                    <select className="select" value={form.nivel} onChange={e => setForm({ ...form, nivel: e.target.value })}>
                      <option value="beginner">Principiante</option>
                      <option value="intermediate">Intermedio</option>
                      <option value="advanced">Avanzado</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Estado</label>
                    <select className="select" value={form.estado} onChange={e => setForm({ ...form, estado: e.target.value })}>
                      <option value="borrador">Borrador</option>
                      <option value="publicado">Publicado</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>Duración (minutos)</label>
                  <input className="input" type="number" placeholder="0" value={form.duracion_min} onChange={e => setForm({ ...form, duracion_min: e.target.value })} />
                </div>
                <button className="btn btn-primary" type="submit">Crear Curso</button>
              </form>
            </div>

            {selected && (
              <div className="card" style={{ marginTop: '1rem' }}>
                <div className="card-header">
                  <h3 className="card-title">Detalles del Curso</h3>
                </div>
                <div>
                  <h4>{selected.titulo}</h4>
                  <p><strong>Slug:</strong> {selected.slug}</p>
                  <p><strong>Nivel:</strong> {selected.nivel}</p>
                  <p><strong>Estado:</strong> <span className={`status status-${selected.estado}`}>{selected.estado}</span></p>
                  <p><strong>Duración:</strong> {selected.duracion_min} minutos</p>
                  {selected.descripcion && <p><strong>Descripción:</strong> {selected.descripcion}</p>}
                  {selected.lecciones && selected.lecciones.length > 0 && (
                    <div>
                      <strong>Lecciones:</strong>
                      <ul>
                        {selected.lecciones.map(l => (
                          <li key={l.id}>{l.orden}. {l.titulo}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function EstudiantesSection() {
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(10)
  const [list, setList] = useState({ content: [], totalElements: 0 })
  const [form, setForm] = useState({ nombre: '', email: '' })
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)

  const load = async () => {
    const data = await api.estudiantes.list(`?page=${page}&size=${size}${search ? `&email=${encodeURIComponent(search)}` : ''}`)
    setList(data)
  }
  useEffect(() => { load() }, [page, size, search])

  const submit = async (e) => {
    e.preventDefault()
    await api.estudiantes.create(form)
    setForm({ nombre: '', email: '' })
    setPage(0)
    load()
  }

  const eliminar = async (id) => {
    await api.estudiantes.delete(id)
    load()
  }

  const verDetalles = async (estudiante) => {
    try {
      const detalle = await api.estudiantes.get(estudiante.id)
      setSelected(detalle)
    } catch (error) {
      console.error('Error loading details:', error)
    }
  }

  const actualizar = async (id, updates) => {
    await api.estudiantes.update(id, updates)
    load()
  }

  return (
    <div className="section">
      <div className="section-header">
        <h2 className="section-title">👥 Gestión de Estudiantes</h2>
        <p className="section-subtitle">Administra la información de tus estudiantes</p>
      </div>
      <div className="section-body">
        <div className="toolbar">
          <div className="toolbar-left">
            <span><strong>Estudiantes Registrados: {list.totalElements || 0}</strong></span>
          </div>
          <div className="toolbar-right">
            <input className="input search" placeholder="Buscar por email..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>

        <div className="grid grid-2">
          <div>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {(list.content || []).length === 0 ? (
                    <tr><td colSpan={3} className="empty">No hay estudiantes</td></tr>
                  ) : (
                    list.content.map(e => (
                      <tr key={e.id}>
                        <td>{e.nombre}</td>
                        <td>{e.email}</td>
                        <td>
                          <div style={{ display: 'flex', gap: 8 }}>
                            <button className="btn btn-warning" onClick={() => verDetalles(e)}>Ver</button>
                            <button className="btn btn-danger" onClick={() => eliminar(e.id)}>Eliminar</button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="pagination">
              <button className="btn" onClick={() => setPage(Math.max(0, page - 1))} disabled={page === 0}>Anterior</button>
              <span>Página {page + 1}</span>
              <button className="btn" onClick={() => setPage(page + 1)}>Siguiente</button>
              <select className="select" value={size} onChange={e => setSize(Number(e.target.value))}>
                <option value={5}>5 por página</option>
                <option value={10}>10 por página</option>
                <option value={20}>20 por página</option>
              </select>
            </div>
          </div>

          <div>
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Registrar Nuevo Estudiante</h3>
              </div>
              <form onSubmit={submit} className="form">
                <div className="form-group">
                  <label>Nombre Completo</label>
                  <input className="input" required placeholder="Nombre del estudiante" value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input className="input" required type="email" placeholder="email@ejemplo.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                </div>
                <button className="btn btn-primary" type="submit">Registrar Estudiante</button>
              </form>
            </div>

            {selected && (
              <div className="card" style={{ marginTop: '1rem' }}>
                <div className="card-header">
                  <h3 className="card-title">Detalles del Estudiante</h3>
                </div>
      <div>
                  <p><strong>ID:</strong> {selected.id}</p>
                  <p><strong>Nombre:</strong> {selected.nombre}</p>
                  <p><strong>Email:</strong> {selected.email}</p>
                  {selected.telefono && <p><strong>Teléfono:</strong> {selected.telefono}</p>}
                  {selected.pais && <p><strong>País:</strong> {selected.pais}</p>}
                  <div style={{ marginTop: '1rem' }}>
                    <button className="btn btn-primary" onClick={() => actualizar(selected.id, { telefono: '+1234567890' })}>Actualizar Teléfono</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function InscripcionesSection() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ estudianteId: '', cursoId: '', progreso: 0 })
  const [loading, setLoading] = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      const data = await api.inscripciones.list()
      setItems(Array.isArray(data) ? data : [])
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => { load() }, [])

  const submit = async (e) => {
    e.preventDefault()
    await api.inscripciones.create({ ...form, progreso: Number(form.progreso || 0) })
    setForm({ estudianteId: '', cursoId: '', progreso: 0 })
    load()
  }

  const actualizar = async (id, progreso) => {
    await api.inscripciones.updateProgreso(id, { progreso })
    load()
  }

  return (
    <div className="section">
      <div className="section-header">
        <h2 className="section-title">📋 Gestión de Inscripciones</h2>
        <p className="section-subtitle">Controla el progreso de los estudiantes en los cursos</p>
      </div>
      <div className="section-body">
        <div className="toolbar">
          <div className="toolbar-left">
            <span><strong>Total Inscripciones: {items.length}</strong></span>
          </div>
          <div className="toolbar-right">
            <button className="btn btn-primary" onClick={load}>Actualizar</button>
          </div>
        </div>

        <div className="grid grid-2">
          <div>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Estudiante ID</th>
                    <th>Curso ID</th>
                    <th>Progreso</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan={4} className="loading">Cargando...</td></tr>
                  ) : items.length === 0 ? (
                    <tr><td colSpan={4} className="empty">No hay inscripciones</td></tr>
                  ) : (
                    items.map(i => (
                      <tr key={i._id}>
                        <td>{i.estudianteId}</td>
                        <td>{i.cursoId}</td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '100px', height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                              <div style={{ width: `${i.progreso || 0}%`, height: '100%', background: '#3182ce', transition: 'width 0.3s' }}></div>
                            </div>
                            <span>{i.progreso || 0}%</span>
                          </div>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: 8 }}>
                            <button className="btn btn-warning" onClick={() => actualizar(i._id, Math.max(0, (i.progreso || 0) - 10))}>-10%</button>
                            <button className="btn btn-success" onClick={() => actualizar(i._id, Math.min(100, (i.progreso || 0) + 10))}>+10%</button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div>
      <div className="card">
              <div className="card-header">
                <h3 className="card-title">Nueva Inscripción</h3>
              </div>
              <form onSubmit={submit} className="form">
                <div className="form-group">
                  <label>ID del Estudiante</label>
                  <input className="input" required placeholder="UUID del estudiante" value={form.estudianteId} onChange={e => setForm({ ...form, estudianteId: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>ID del Curso</label>
                  <input className="input" required placeholder="ID numérico del curso" value={form.cursoId} onChange={e => setForm({ ...form, cursoId: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Progreso Inicial (%)</label>
                  <input className="input" type="number" min="0" max="100" placeholder="0" value={form.progreso} onChange={e => setForm({ ...form, progreso: e.target.value })} />
                </div>
                <button className="btn btn-primary" type="submit">Crear Inscripción</button>
              </form>
            </div>

            <div className="card" style={{ marginTop: '1rem' }}>
              <div className="card-header">
                <h3 className="card-title">Estadísticas</h3>
              </div>
              <div>
                <p><strong>Total Inscripciones:</strong> {items.length}</p>
                <p><strong>Completadas (100%):</strong> {items.filter(i => (i.progreso || 0) === 100).length}</p>
                <p><strong>En Progreso:</strong> {items.filter(i => (i.progreso || 0) > 0 && (i.progreso || 0) < 100).length}</p>
                <p><strong>Sin Iniciar (0%):</strong> {items.filter(i => (i.progreso || 0) === 0).length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


function DashboardSection() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [fallbackStats, setFallbackStats] = useState({ total_estudiantes: 0, total_cursos: 0, total_inscripciones: 0, inscripciones_activas: 0 })

  const loadStats = async () => {
    setLoading(true)
    setError('')
    try {
      console.log('Loading dashboard stats...')
      const data = await api.agregador.estadisticas()
      console.log('Dashboard stats received:', data)
      setStats(data)
    } catch (error) {
      console.error('Error loading dashboard stats:', error)
      setError('Error al cargar estadísticas del agregador: ' + error.message)
      
      // Try to get fallback data from individual services
      try {
        console.log('Trying fallback data...')
        const [cursosData, estudiantesData, inscripcionesData] = await Promise.all([
          api.cursos.list().catch(() => []),
          api.estudiantes.list().catch(() => ({ content: [], totalElements: 0 })),
          api.inscripciones.list().catch(() => [])
        ])
        
        const fallback = {
          total_estudiantes: Array.isArray(estudiantesData) ? estudiantesData.length : estudiantesData.totalElements || 0,
          total_cursos: Array.isArray(cursosData) ? cursosData.length : 0,
          total_inscripciones: Array.isArray(inscripcionesData) ? inscripcionesData.length : 0,
          inscripciones_activas: Array.isArray(inscripcionesData) ? 
            inscripcionesData.filter(i => i.estado === 'activa').length : 0
        }
        
        console.log('Fallback stats:', fallback)
        setFallbackStats(fallback)
      } catch (fallbackError) {
        console.error('Fallback also failed:', fallbackError)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadStats() }, [])

  const currentStats = stats || fallbackStats
  const isUsingFallback = !stats && fallbackStats.total_estudiantes > 0

  return (
    <div className="section">
      <div className="section-header">
        <h2 className="section-title">📊 Dashboard</h2>
        <p className="section-subtitle">Estadísticas del sistema</p>
      </div>
      <div className="section-body">
        <div className="toolbar">
          <div className="toolbar-left">
            <span><strong>Panel de Control</strong></span>
          </div>
          <div className="toolbar-right">
            <button className="btn btn-primary" onClick={loadStats} disabled={loading}>
              {loading ? 'Cargando...' : '🔄 Actualizar'}
            </button>
          </div>
        </div>


        <div className="grid grid-3">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">👥 Estudiantes</h3>
            </div>
            <div>
              <p><strong>Total:</strong> {currentStats.total_estudiantes || 0}</p>
              {loading && <p style={{ color: '#666', fontSize: '12px' }}>Cargando...</p>}
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="card-title">📚 Cursos</h3>
            </div>
            <div>
              <p><strong>Total:</strong> {currentStats.total_cursos || 0}</p>
              {loading && <p style={{ color: '#666', fontSize: '12px' }}>Cargando...</p>}
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="card-title">📋 Inscripciones</h3>
            </div>
            <div>
              <p><strong>Total:</strong> {currentStats.total_inscripciones || 0}</p>
              <p><strong>Activas:</strong> {currentStats.inscripciones_activas || 0}</p>
              {loading && <p style={{ color: '#666', fontSize: '12px' }}>Cargando...</p>}
            </div>
          </div>
        </div>

        {!loading && !error && currentStats.total_estudiantes === 0 && currentStats.total_cursos === 0 && currentStats.total_inscripciones === 0 && (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px', 
            color: '#666',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            marginTop: '20px'
          }}>
            <h3>📊 No hay datos disponibles</h3>
            <p>Los microservicios pueden estar iniciando o no hay datos registrados aún.</p>
            <p>Intenta crear algunos estudiantes, cursos e inscripciones primero.</p>
          </div>
        )}
      </div>
    </div>
  )
}

function App() {
  const [activeSection, setActiveSection] = useState('dashboard')

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-content">
          <div className="brand">
            <div className="brand-icon">🎓</div>
            <span>Cloud Courses</span>
          </div>
          <div className="nav-links">
            <button 
              className={`nav-link ${activeSection === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveSection('dashboard')}
            >
              📊 Dashboard
            </button>
            <button 
              className={`nav-link ${activeSection === 'cursos' ? 'active' : ''}`}
              onClick={() => setActiveSection('cursos')}
            >
              📚 Cursos
            </button>
            <button 
              className={`nav-link ${activeSection === 'estudiantes' ? 'active' : ''}`}
              onClick={() => setActiveSection('estudiantes')}
            >
              👥 Estudiantes
            </button>
            <button 
              className={`nav-link ${activeSection === 'inscripciones' ? 'active' : ''}`}
              onClick={() => setActiveSection('inscripciones')}
            >
              📋 Inscripciones
            </button>
          </div>
        </div>
      </nav>

      <main className="main-content">
        <div className="container">
          {activeSection === 'dashboard' && <DashboardSection />}
          {activeSection === 'cursos' && <CursosSection />}
          {activeSection === 'estudiantes' && <EstudiantesSection />}
          {activeSection === 'inscripciones' && <InscripcionesSection />}
        </div>
      </main>
    </div>
  )
}

export default App