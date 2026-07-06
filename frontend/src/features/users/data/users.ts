import { faker } from '@faker-js/faker'

// Set a fixed seed for consistent data generation
faker.seed(67890)

export const users = Array.from({ length: 500 }, () => {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  return {
    id: faker.string.uuid(),
    firstName,
    lastName,
    username: faker.internet
      .username({ firstName, lastName })
      .toLocaleLowerCase(),
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@epn.edu.ec`.replace(/[^a-z.@]/g, ''),
    phoneNumber: faker.phone.number({ style: 'international' }),
    status: faker.helpers.arrayElement([
      'Matriculado',
      'Inactivo',
      'Egresado',
      'Suspendido',
    ]),
    role: faker.helpers.arrayElement([
      'Estudiante',
      'Docente',
      'Administrativo',
      'Ayudante',
    ]),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  }
})
