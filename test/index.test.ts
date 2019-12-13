import { up, down } from '../src';

describe('migration-engine', () => {
  it('up 1 migration', () => {
    const applied = [{ name: 'a' }, { name: 'b' }];
    const all = [...applied, { name: 'c' }];
    expect(up(applied, all)).toEqual([
      {
        name: 'c',
      },
    ]);
  });

  it('up 2 out of order migrations', () => {
    const applied = [{ name: 'b' }, { name: 'a' }];
    const all = [...applied, { name: '1' }, { name: '0' }];
    expect(up(applied, all)).toEqual([
      { name: '0' },
      {
        name: '1',
      },
    ]);
  });

  it('up with duplicate applied', () => {
    const applied = [{ name: 'a' }, { name: 'a' }];
    const all = [...applied, { name: '1' }];
    expect(() => up(applied, all)).toThrowError();
  });

  it('up with duplicate all', () => {
    const applied = [{ name: 'a' }, { name: 'b' }];
    const all = [...applied, { name: 'b' }];
    expect(() => up(applied, all)).toThrowError();
  });

  it('down 1 migration', () => {
    const applied = [{ name: 'b' }, { name: 'a' }];
    expect(down(applied)).toEqual([
      {
        name: 'b',
      },
    ]);
  });
});
