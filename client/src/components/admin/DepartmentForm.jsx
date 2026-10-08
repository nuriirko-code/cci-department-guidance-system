import competencies from '../../data/competencies'

const EMPTY_DEPARTMENT = {
  code: '',
  name: '',
  color: '#4f46e5',
  blurb: '',
  verified: 'general',
  hod: { name: '', photo: '' },
  history: { established: '', origin: '' },
  overview: '',
  duration: '',
  studentBody: '',
  faculty: '',
  skillsNeeded: [],
  facilities: '',
  activities: [],
  careerPaths: [],
  competencyProfile: {},
  assessmentNotes: '',
  marketDemand: '',
  postgrad: '',
}

function toFormValues(department) {
  if (!department) return EMPTY_DEPARTMENT
  return {
    ...EMPTY_DEPARTMENT,
    ...department,
    hod: { ...EMPTY_DEPARTMENT.hod, ...department.hod },
    history: { ...EMPTY_DEPARTMENT.history, ...department.history },
    skillsNeeded: department.skillsNeeded || [],
    activities: department.activities || [],
    careerPaths: department.careerPaths || [],
    competencyProfile: department.competencyProfile || {},
  }
}

function DepartmentForm({ department, onSubmit, onCancel, saving }) {
  const values = toFormValues(department)

  function submit(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const payload = {
      code: formData.get('code').trim().toUpperCase(),
      name: formData.get('name').trim(),
      color: formData.get('color'),
      blurb: formData.get('blurb').trim(),
      verified: formData.get('verified'),
      hod: { name: formData.get('hod.name').trim() || null, photo: formData.get('hod.photo').trim() || null },
      history: { established: formData.get('history.established').trim() || null, origin: formData.get('history.origin').trim() || null },
      overview: formData.get('overview').trim(),
      duration: formData.get('duration').trim(),
      studentBody: formData.get('studentBody').trim(),
      faculty: formData.get('faculty').trim(),
      skillsNeeded: formData.get('skillsNeeded').split('\n').map((item) => item.trim()).filter(Boolean),
      facilities: formData.get('facilities').trim(),
      activities: formData.get('activities').split('\n').map((item) => item.trim()).filter(Boolean),
      careerPaths: formData.get('careerPaths').split('\n').map((item) => item.trim()).filter(Boolean),
      // Serialize the fixed competency table as numeric values so Mongoose stores a Map compatible with the quiz scorer.
      competencyProfile: Object.fromEntries(competencies.map(({ key }) => [key, Number(formData.get(`competencyProfile.${key}`) || 0)])),
      assessmentNotes: formData.get('assessmentNotes').trim(),
      marketDemand: formData.get('marketDemand').trim(),
      postgrad: formData.get('postgrad').trim(),
    }
    onSubmit(payload)
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="code" label="Code" defaultValue={values.code} required />
        <Field name="name" label="Name" defaultValue={values.name} required />
        <label className="text-sm font-semibold text-slate-700">
          Color
          <input name="color" type="color" defaultValue={values.color} className="mt-2 block h-11 w-full cursor-pointer rounded-lg border border-slate-300 bg-white p-1" />
        </label>
        <label className="text-sm font-semibold text-slate-700">
          Verification
          <select name="verified" defaultValue={values.verified} className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-3 font-normal">
            <option value="general">General</option>
            <option value="hod">HOD verified</option>
          </select>
        </label>
      </div>

      <Field name="blurb" label="Blurb" defaultValue={values.blurb} required />
      <Field name="overview" label="Overview" defaultValue={values.overview} multiline />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="duration" label="Duration" defaultValue={values.duration} />
        <Field name="studentBody" label="Student body" defaultValue={values.studentBody} />
        <Field name="faculty" label="Faculty" defaultValue={values.faculty} />
        <Field name="facilities" label="Facilities" defaultValue={values.facilities} />
      </div>
 
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <h3 className="font-['Space_Grotesk'] font-bold text-slate-900">Leadership and history</h3>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <Field name="hod.name" label="HOD name" defaultValue={values.hod.name} />
          <Field name="hod.photo" label="HOD photo URL" defaultValue={values.hod.photo} />
          <Field name="history.established" label="Established" defaultValue={values.history.established} multiline />
          <Field name="history.origin" label="Origin" defaultValue={values.history.origin} multiline />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <Field name="skillsNeeded" label="Skills needed" defaultValue={values.skillsNeeded.join('\n')} multiline hint="One item per line" />
        <Field name="activities" label="Activities" defaultValue={values.activities.join('\n')} multiline hint="One item per line" />
        <Field name="careerPaths" label="Career paths" defaultValue={values.careerPaths.join('\n')} multiline hint="One item per line" />
      </div>

      <Field name="marketDemand" label="Market demand" defaultValue={values.marketDemand} multiline />
      <Field name="postgrad" label="Postgraduate opportunities" defaultValue={values.postgrad} multiline />

      {/* Keep each department's competency values beside their evidence so admins can review what the scoring profile is based on. */}
      <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <div>
          <h3 className="font-['Space_Grotesk'] font-bold text-slate-900">Assessment competency profile</h3>
          <p className="mt-1 text-sm text-slate-500">Rate each documented competency from 0 (not characteristic) to 3 (strongly characteristic).</p>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {competencies.map(({ key, label }) => (
            <label key={key} className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700">
              {label}
              <input
                name={`competencyProfile.${key}`}
                type="number"
                min="0"
                max="3"
                step="1"
                required
                defaultValue={values.competencyProfile[key] ?? 0}
                className="w-16 rounded-lg border border-slate-300 px-2 py-2 text-center outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />
            </label>
          ))}
        </div>
        <div className="mt-5">
          <Field name="assessmentNotes" label="Source / evidence for these competency ratings" defaultValue={values.assessmentNotes} required multiline hint="Required; e.g. HOD interview or curriculum description" />
        </div>
      </section>

      <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
        <button type="button" onClick={onCancel} className="rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50">Cancel</button>
        <button type="submit" disabled={saving} className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60">{saving ? 'Saving...' : department ? 'Save changes' : 'Create department'}</button>
      </div>
    </form>
  )
}

function Field({ name, label, defaultValue, required = false, multiline = false, hint = '' }) {
  const className = 'mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-3 font-normal outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100'
  return (
    <label className="block text-sm font-semibold text-slate-700">
      {label}
      {hint && <span className="ml-2 text-xs font-normal text-slate-400">{hint}</span>}
      {multiline ? <textarea name={name} defaultValue={defaultValue} required={required} rows={4} className={className} /> : <input name={name} defaultValue={defaultValue} required={required} className={className} />}
    </label>
  )
}

export default DepartmentForm
