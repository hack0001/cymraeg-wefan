import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Mutations' };

export default function Mutations() {
  return (
    <>
  <h1 className="page-h">Mutations</h1>
  <p className="lede">The first letter of a word can change depending on what comes before it. There are three kinds. You don’t need to master them before you start speaking; you’ll pick them up from phrases.</p>

  <section>
    <h2 className="h2" style={{ fontSize: '1.35rem' }}>Soft mutation</h2>
    <p>The most common. It happens after words like <b>dy</b> (your), <b>ei</b> (his), <b>i</b> (to), <b>o</b> (from), and after <b>y</b> (the) with feminine singular nouns.</p>
    <div className="scroll-x"><table><tbody>
      <tr><th>Starts with</th><td className="k">p</td><td className="k">t</td><td className="k">c</td><td className="k">b</td><td className="k">d</td><td className="k">g</td><td className="k">ll</td><td className="k">m</td><td className="k">rh</td></tr>
      <tr><th>Becomes</th><td className="k">b</td><td className="k">d</td><td className="k">g</td><td className="k">f</td><td className="k">dd</td><td className="k">(drops)</td><td className="k">l</td><td className="k">f</td><td className="k">r</td></tr>
    </tbody></table></div>
    <ul className="ex">
      <li><b>mam</b> → <b>dy fam</b> (your mum)</li>
      <li><b>tad</b> → <b>dy dad</b> (your dad)</li>
      <li><b>brawd</b> → <b>ei frawd</b> (his brother)</li>
      <li><b>Cymru</b> → <b>i Gymru</b> (to Wales)</li>
    </ul>
  </section>

  <section>
    <h2 className="h2" style={{ fontSize: '1.35rem' }}>Nasal mutation</h2>
    <p>Happens after <b>fy</b> (my) and <b>yn</b> (in).</p>
    <div className="scroll-x"><table><tbody>
      <tr><th>Starts with</th><td className="k">p</td><td className="k">t</td><td className="k">c</td><td className="k">b</td><td className="k">d</td><td className="k">g</td></tr>
      <tr><th>Becomes</th><td className="k">mh</td><td className="k">nh</td><td className="k">ngh</td><td className="k">m</td><td className="k">n</td><td className="k">ng</td></tr>
    </tbody></table></div>
    <ul className="ex">
      <li><b>tad</b> → <b>fy nhad</b> (my dad)</li>
      <li><b>brawd</b> → <b>fy mrawd</b> (my brother)</li>
      <li><b>Cymru</b> → <b>yng Nghymru</b> (in Wales)</li>
      <li><b>Bangor</b> → <b>ym Mangor</b> (in Bangor)</li>
    </ul>
  </section>

  <section>
    <h2 className="h2" style={{ fontSize: '1.35rem' }}>Aspirate mutation</h2>
    <p>The rarest. It happens after <b>ei</b> (her) and <b>a</b> (and) before certain words.</p>
    <div className="scroll-x"><table><tbody>
      <tr><th>Starts with</th><td className="k">p</td><td className="k">t</td><td className="k">c</td></tr>
      <tr><th>Becomes</th><td className="k">ph</td><td className="k">th</td><td className="k">ch</td></tr>
    </tbody></table></div>
    <ul className="ex">
      <li><b>cath</b> → <b>ei chath</b> (her cat)</li>
      <li><b>tad</b> → <b>ei thad</b> (her dad)</li>
      <li><b>plentyn</b> → <b>ei phlentyn</b> (her child)</li>
    </ul>
  </section>
  <p className="note">If you can’t find a word in the dictionary, undo the mutation. Dictionaries list the starting form, so <b>fy nghath</b> is under <b>cath</b>.</p>
    </>
  );
}
