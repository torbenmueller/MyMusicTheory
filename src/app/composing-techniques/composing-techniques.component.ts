import { Component, OnInit } from '@angular/core';
import { Vex, Voice } from 'vexflow';

@Component({
  selector: 'app-composing-techniques',
  templateUrl: './composing-techniques.component.html',
  styleUrls: ['./composing-techniques.component.css'],
})
export class ComposingTechniquesComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.createScore();
  }

  createScore() {
    const {
      Renderer,
      Stave,
      StaveNote,
      Beam,
      Formatter,
      Accidental,
      KeySignature,
      Tuplet,
      Articulation,
      Curve,
      GraceNote,
      GraceNoteGroup,
      Barline,
      StaveConnector
    } = Vex.Flow;

    // Measure 1 - 4
    const div = document.getElementById('score') as HTMLCanvasElement;
    const renderer = new Renderer(div, Renderer.Backends.SVG);
    renderer.resize(1298, 120);
    const context = renderer.getContext();

    const stave = new Stave(0, 0, 324);
    const stave2 = new Stave(324, 0, 324);
    const stave3 = new Stave(648, 0, 324);
    const stave4 = new Stave(972, 0, 324);

    const keySignature = new KeySignature('Ab');
    stave.addClef('treble').addTimeSignature('4/4');
    keySignature.addToStave(stave);

    stave.setContext(context).draw();
    stave2.setContext(context).draw();
    stave3.setContext(context).draw();
    stave4.setContext(context).draw();

    const notes = [
      new StaveNote({
        keys: ['f/4'],
        duration: 'q',
        auto_stem: true,
      }).addModifier(new Articulation('a.').setPosition(4), 0),
      new StaveNote({
        keys: ['a/4'],
        duration: 'q',
        auto_stem: true,
      }).addModifier(new Articulation('a.').setPosition(4), 0),
      new StaveNote({
        keys: ['c/5'],
        duration: 'q',
        auto_stem: true,
      }).addModifier(new Articulation('a.').setPosition(3), 0),
      new StaveNote({
        keys: ['f/5'],
        duration: 'q',
        auto_stem: true,
      }).addModifier(new Articulation('a.').setPosition(3), 0),
    ];

    const notes2 = [
      this.dotted(
        new StaveNote({
          keys: ['a/5'],
          duration: 'qd',
          auto_stem: true,
        })
      ),
      new StaveNote({ keys: ['g/5'], duration: '16', auto_stem: true }),
      new StaveNote({ keys: ['f/5'], duration: '16', auto_stem: true }),
      new StaveNote({
        keys: ['e/5'],
        duration: '16',
        auto_stem: true,
      }).addModifier(new Accidental('n')),
      new StaveNote({
        keys: ['f/5'],
        duration: 'q',
        auto_stem: true,
      }).addModifier(new Articulation('a.').setPosition(3), 0),
      new StaveNote({ keys: ['b/4'], duration: 'qr', auto_stem: true }),
    ];
    const triplet = new Tuplet(notes2.slice(1, 4));

    const notes3 = [
      new StaveNote({
        keys: ['g/4'],
        duration: 'q',
        auto_stem: true,
      }).addModifier(new Articulation('a.').setPosition(4), 0),
      new StaveNote({
        keys: ['c/5'],
        duration: 'q',
        auto_stem: true,
      }).addModifier(new Articulation('a.').setPosition(3), 0),
      new StaveNote({
        keys: ['e/5'],
        duration: 'q',
        auto_stem: true,
      })
        .addModifier(new Accidental('n'))
        .addModifier(new Articulation('a.').setPosition(3), 0),
      new StaveNote({
        keys: ['g/5'],
        duration: 'q',
        auto_stem: true,
      }).addModifier(new Articulation('a.').setPosition(3), 0),
    ];

    const notes4 = [
      this.dotted(
        new StaveNote({
          keys: ['b/5'],
          duration: 'qd',
          auto_stem: true,
        })
      ),
      new StaveNote({ keys: ['a/5'], duration: '16', auto_stem: true }),
      new StaveNote({ keys: ['g/5'], duration: '16', auto_stem: true }),
      new StaveNote({ keys: ['f/5'], duration: '16', auto_stem: true }),
      new StaveNote({
        keys: ['g/5'],
        duration: 'q',
        auto_stem: true,
      }).addModifier(new Articulation('a.').setPosition(3), 0),
      new StaveNote({ keys: ['b/4'], duration: 'qr', auto_stem: true }),
    ];
    const triplet2 = new Tuplet(notes4.slice(1, 4));

    // Create a voice in 4/4 and add above notes
    const voice = new Voice({ num_beats: 4, beat_value: 4 });
    voice.addTickables(notes);
    const voice2 = new Voice({ num_beats: 4, beat_value: 4 });
    voice2.addTickables(notes2);
    const voice3 = new Voice({ num_beats: 4, beat_value: 4 });
    voice3.addTickables(notes3);
    const voice4 = new Voice({ num_beats: 4, beat_value: 4 });
    voice4.addTickables(notes4);

    // Format and justify the notes to 400 pixels.
    new Formatter().joinVoices([voice]).format([voice], 200);
    new Formatter().joinVoices([voice2]).format([voice2], 324);
    new Formatter().joinVoices([voice3]).format([voice3], 324);
    new Formatter().joinVoices([voice4]).format([voice4], 324);

    // Create a Beam for the 16th notes
    const beams = Beam.generateBeams(notes2.slice(1, 4));
    const beams2 = Beam.generateBeams(notes4.slice(1, 4));

    // Render voice
    voice.draw(context, stave);
    voice2.draw(context, stave2);
    voice3.draw(context, stave3);
    voice4.draw(context, stave4);

    beams.forEach(beam => beam.setContext(context).draw());
    beams2.forEach(beam => beam.setContext(context).draw());

    triplet.setContext(stave2.getContext()).draw();
    triplet2.setContext(stave4.getContext()).draw();

    // Add a slur above the notes
    const slur = new Curve(notes2[0], notes2[4], { cps: [{ x: 0, y: 20 }, { x: 0, y: 20 }] });
    slur.setContext(context).draw();

    const slur2 = new Curve(notes4[0], notes4[4], { cps: [{ x: 0, y: 20 }, { x: 0, y: 20 }] });
    slur2.setContext(context).draw();

    // Measure 5 - 8
    const div2 = document.getElementById('score2') as HTMLCanvasElement;
    const renderer2 = new Renderer(div2, Renderer.Backends.SVG);
    renderer2.resize(1298, 120);
    const context2 = renderer2.getContext();

    const stave5 = new Stave(0, 0, 324);
    const stave6 = new Stave(324, 0, 324);
    const stave7 = new Stave(648, 0, 324);
    const stave8 = new Stave(972, 0, 324);

    stave5.addClef('treble');
    keySignature.addToStave(stave5);

    stave5.setContext(context2).draw();
    stave6.setContext(context2).draw();
    stave7.setContext(context2).draw();
    stave8.setContext(context2).draw();

    const graceNote = new GraceNote({ keys: ["c/5"], duration: "8", slash: true });

    const notes5 = [
      this.dotted(
        new StaveNote({
          keys: ['a/5'],
          duration: 'qd',
          auto_stem: true,
        })
      ).addModifier(new GraceNoteGroup([graceNote], false)),
      new StaveNote({ keys: ['g/5'], duration: '16', auto_stem: true }),
      new StaveNote({ keys: ['f/5'], duration: '16', auto_stem: true }),
      new StaveNote({
        keys: ['e/5'],
        duration: '16',
        auto_stem: true,
      }).addModifier(new Accidental('n')),
      new StaveNote({
        keys: ['f/5'],
        duration: 'q',
        auto_stem: true,
      }).addModifier(new Articulation('a.').setPosition(3), 0),
      new StaveNote({ keys: ['b/4'], duration: 'qr', auto_stem: true }),
    ];
    const triplet3 = new Tuplet(notes5.slice(1, 4));

    const notes6 = [
      this.dotted(
        new StaveNote({
          keys: ['b/5'],
          duration: 'qd',
          auto_stem: true,
        })
      ).addModifier(new GraceNoteGroup([graceNote], false)),
      new StaveNote({ keys: ['a/5'], duration: '16', auto_stem: true }),
      new StaveNote({ keys: ['g/5'], duration: '16', auto_stem: true }),
      new StaveNote({ keys: ['f/5'], duration: '16', auto_stem: true }),
      new StaveNote({
        keys: ['g/5'],
        duration: 'q',
        auto_stem: true,
      }).addModifier(new Articulation('a.').setPosition(3), 0),
      new StaveNote({ keys: ['b/4'], duration: 'qr', auto_stem: true }),
    ];
    const triplet4 = new Tuplet(notes6.slice(1, 4));

    const notes7 = [
      new StaveNote({ keys: ['c/6'], duration: 'h', auto_stem: true }),
      new StaveNote({ keys: ['b/5'], duration: '8', auto_stem: true }),
      new StaveNote({ keys: ['a/5'], duration: '8', auto_stem: true }),
      new StaveNote({ keys: ['g/5'], duration: '8', auto_stem: true }),
      new StaveNote({ keys: ['f/5'], duration: '8', auto_stem: true }),
    ];

    const graceNotes = [
      new GraceNote({ keys: ["e/5"], duration: "16" }).addModifier(new Accidental('n')),
      new GraceNote({ keys: ["f/5"], duration: "16" }),
      new GraceNote({ keys: ["g/5"], duration: "16" }),
    ];

    const notes8 = [
      new StaveNote({ keys: ['f/5'], duration: 'q', auto_stem: true }).addModifier(new GraceNoteGroup(graceNotes, false).beamNotes()),
      new StaveNote({ keys: ['e/5'], duration: 'q', auto_stem: true }),
      new StaveNote({ keys: ['b/4'], duration: 'hr' }),
    ];

    // Create a voice in 4/4 and add above notes
    const voice5 = new Voice({ num_beats: 4, beat_value: 4 });
    voice5.addTickables(notes5);
    const voice6 = new Voice({ num_beats: 4, beat_value: 4 });
    voice6.addTickables(notes6);
    const voice7 = new Voice({ num_beats: 4, beat_value: 4 });
    voice7.addTickables(notes7);
    const voice8 = new Voice({ num_beats: 4, beat_value: 4 });
    voice8.addTickables(notes8);

    // Format and justify the notes to 400 pixels.
    new Formatter().joinVoices([voice5]).format([voice5], 200);
    new Formatter().joinVoices([voice6]).format([voice6], 324);
    new Formatter().joinVoices([voice7]).format([voice7], 324);
    new Formatter().joinVoices([voice8]).format([voice8], 324);

    // Create a Beam for the notes
    const beams3 = Beam.generateBeams(notes5.slice(1, 4));
    const beams4 = Beam.generateBeams(notes6.slice(1, 4));
    const beams5 = new Beam(notes7.slice(1, 5));
    // const beams6 = Beam.generateBeams(notes8.slice(0, 3));

    // Add a double barline at the end of the stave
    stave8.setEndBarType(Barline.type.END);
    stave8.draw();

    // Render voice
    voice5.draw(context2, stave5);
    voice6.draw(context2, stave6);
    voice7.draw(context2, stave7);
    voice8.draw(context2, stave8);

    beams3.forEach(beam => beam.setContext(context2).draw());
    beams4.forEach(beam => beam.setContext(context2).draw());
    beams5.setContext(context2).draw();
    // beams6.forEach(beam => beam.setContext(context2).draw());

    triplet3.setContext(stave5.getContext()).draw();
    triplet4.setContext(stave6.getContext()).draw();

    // Add a slur above the notes
    const slur3 = new Curve(notes5[0], notes5[4], { cps: [{ x: 0, y: 20 }, { x: 0, y: 20 }] });
    slur3.setContext(context2).draw();

    const slur4 = new Curve(notes6[0], notes6[4], { cps: [{ x: 0, y: 20 }, { x: 0, y: 20 }] });
    slur4.setContext(context2).draw();

    const slur5 = new Curve(notes7[1], notes7[4], { cps: [{ x: 0, y: 20 }, { x: 0, y: 20 }] });
    slur5.setContext(context2).draw();

    const slur6 = new Curve(notes8[0], notes8[1], { cps: [{ x: 0, y: 10 }, { x: 0, y: 10 }] });
    slur6.setContext(context2).draw();
  }

  dotted(staveNote, noteIndex = -1) {
    const { Dot } = Vex.Flow;
    if (noteIndex < 0) {
      Dot.buildAndAttach([staveNote], {
        all: true,
      });
    } else {
      Dot.buildAndAttach([staveNote], {
        index: noteIndex,
      });
    }
    return staveNote;
  }
}
