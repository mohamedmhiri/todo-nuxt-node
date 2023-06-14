export async function load() {
  return $fetch('http://localhost:4000/api/todos');
}

export async function add(item) {
  if (!item) return;
  return $fetch('http://localhost:4000/api/todos', { method: 'POST', body: item });
}

export async function patchIsCompleted({ _id, isCompleted }) {
  if (!_id) return;
  await $fetch(`http://localhost:4000/api/todos/${_id}`, { method: 'PUT', body: { isCompleted } });
}

export async function patchPosition({ _id, position }) {
  if (!_id) return;
  await $fetch(`http://localhost:4000/api/todos/${_id}`, { method: 'PUT', body: { position } });
}

export async function remove (ids) {
  if (ids.length === 0) return;
  const identifiers = ids.length > 1 ? ids.join(',') : ids;
  await $fetch(`http://localhost:4000/api/todos?ids=${identifiers}`, { method: 'DELETE' });
}