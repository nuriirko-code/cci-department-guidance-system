function DepartmentTable({ departments, selectedId, onSelect, onEdit, onDelete }) {
  if (departments.length === 0) {
    return <div className="rounded-2xl border border-dashed border-slate-300 px-6 py-12 text-center text-sm text-slate-500">No departments found.</div>
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
            <tr><th className="px-5 py-4">Department</th><th className="px-5 py-4">Code</th><th className="px-5 py-4">Status</th><th className="px-5 py-4 text-right">Actions</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {departments.map((department) => (
              <tr key={department._id} className={selectedId === department._id ? 'bg-indigo-50/60' : ''}>
                <td className="px-5 py-4">
                  <button onClick={() => onSelect(department)} className="flex items-center gap-3 text-left">
                    <span className="h-3 w-3 rounded-full" style={{ backgroundColor: department.color }} />
                    <span><strong className="block text-slate-900">{department.name}</strong><span className="text-xs text-slate-500">{department.hod?.name || 'No HOD assigned'}</span></span>
                  </button>
                </td>
                <td className="px-5 py-4 font-['IBM_Plex_Mono'] text-xs font-semibold text-slate-600">{department.code}</td>
                <td className="px-5 py-4"><span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">{department.verified === 'hod' ? 'HOD verified' : 'General'}</span></td>
                <td className="px-5 py-4"><div className="flex justify-end gap-2"><button onClick={() => onEdit(department)} className="rounded-lg px-3 py-2 text-xs font-semibold text-indigo-600 hover:bg-indigo-50">Edit</button><button onClick={() => onDelete(department)} className="rounded-lg px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50">Delete</button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DepartmentTable
