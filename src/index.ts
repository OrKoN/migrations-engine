interface Migration {
  name: string;
}

export function up(
  appliedMigrations: Migration[],
  allMigrations: Migration[]
): Migration[] {
  const lookup = new Map<string, Migration>();

  for (const m of allMigrations) {
    if (lookup.has(m.name)) {
      throw new Error(duplicateErrorMsg(m.name));
    }
    lookup.set(m.name, m);
  }

  lookup.clear();

  for (const m of appliedMigrations) {
    if (lookup.has(m.name)) {
      throw new Error(duplicateErrorMsg(m.name));
    }
    lookup.set(m.name, m);
  }

  sortMigrationsAsc(allMigrations);

  const applied: Migration[] = [];

  for (const m of allMigrations) {
    if (!lookup.has(m.name)) {
      applied.push(m);
    }
  }

  return applied;
}

export function down(appliedMigrations: Migration[]): Migration[] {
  sortMigrationsAsc(appliedMigrations);

  if (appliedMigrations.length === 0) {
    return [];
  }

  return [appliedMigrations[appliedMigrations.length - 1]];
}

function duplicateErrorMsg(name: string) {
  return `Migration ${name} is not unique. All migration names must be unique.`;
}

function sortMigrationsAsc(migrations: Migration[]) {
  migrations.sort((a, b) => a.name.localeCompare(b.name));
}
