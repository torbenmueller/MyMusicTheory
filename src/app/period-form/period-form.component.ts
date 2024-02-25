import { Component, OnInit } from '@angular/core';
import { Vex, Voice } from 'vexflow';

@Component({
  selector: 'app-period-form',
  templateUrl: './period-form.component.html',
  styleUrls: ['./period-form.component.css']
})
export class PeriodFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.createPeriodForm();
  }

  createPeriodForm() {
    const {
      Renderer,
      Stave,
      StaveNote,
      Beam,
      Formatter,
      KeySignature,
      Curve,
      Barline,
      Dot
    } = Vex.Flow;

    // Measure 1 - 4
    const div = document.getElementById('score3') as HTMLCanvasElement;
    const renderer = new Renderer(div, Renderer.Backends.SVG);
    renderer.resize(1298, 120);
    const context = renderer.getContext();

    const stave = new Stave(0, 0, 324);
    const stave2 = new Stave(324, 0, 324);
    const stave3 = new Stave(648, 0, 324);
    const stave4 = new Stave(972, 0, 324);

    const keySignature = new KeySignature('A');
    stave.addClef('treble').addTimeSignature('6/8');
    keySignature.addToStave(stave);

    stave.setContext(context).draw();
    stave2.setContext(context).draw();
    stave3.setContext(context).draw();
    stave4.setContext(context).draw();

    const notes = [
      new StaveNote({
        keys: ['c/5'],
        duration: '8d',
        auto_stem: true,
      }).addModifier(new Dot()),
      new StaveNote({
        keys: ['d/5'],
        duration: '16',
        auto_stem: true,
      }),
      new StaveNote({
        keys: ['c/5'],
        duration: '8',
        auto_stem: true,
      }),
      new StaveNote({
        keys: ['e/5'],
        duration: 'q',
        auto_stem: true,
      }),
      new StaveNote({
        keys: ['e/5'],
        duration: '8',
        auto_stem: true,
      }),
    ];

    const notes2 = [
      new StaveNote({
        keys: ['b/4'],
        duration: '8d',
        auto_stem: true,
      }).addModifier(new Dot()),
      new StaveNote({
        keys: ['c/5'],
        duration: '16',
        auto_stem: true,
      }),
      new StaveNote({
        keys: ['b/4'],
        duration: '8',
        auto_stem: true,
      }),
      new StaveNote({
        keys: ['d/5'],
        duration: 'q',
        auto_stem: true,
      }),
      new StaveNote({
        keys: ['d/5'],
        duration: '8',
        auto_stem: true,
      }),
    ];

    const notes3 = [
      new StaveNote({
        keys: ['a/4'],
        duration: 'q',
        auto_stem: true,
      }),
      new StaveNote({
        keys: ['a/4'],
        duration: '8',
        auto_stem: true,
      }),
      new StaveNote({
        keys: ['b/4'],
        duration: 'q',
        auto_stem: true,
      }),
      new StaveNote({
        keys: ['b/4'],
        duration: '8',
        auto_stem: true,
      }),
    ];

    const notes4 = [
      new StaveNote({
        keys: ['c/5'],
        duration: 'q',
        auto_stem: true,
      }),
      new StaveNote({
        keys: ['e/5'],
        duration: '16',
        auto_stem: true,
      }),
      new StaveNote({
        keys: ['d/5'],
        duration: '16',
        auto_stem: true,
      }),
      new StaveNote({
        keys: ['c/5'],
        duration: 'q',
        auto_stem: true,
      }),
      new StaveNote({
        keys: ['b/4'],
        duration: '8',
        auto_stem: true,
      }),
    ];

    // Create a voice in 3/4 and add above notes
    const voice = new Voice({ num_beats: 3, beat_value: 4 });
    voice.addTickables(notes);
    const voice2 = new Voice({ num_beats: 3, beat_value: 4 });
    voice2.addTickables(notes2);
    const voice3 = new Voice({ num_beats: 3, beat_value: 4 });
    voice3.addTickables(notes3);
    const voice4 = new Voice({ num_beats: 3, beat_value: 4 });
    voice4.addTickables(notes4);

    // Format and justify the notes
    new Formatter().joinVoices([voice]).format([voice], 200);
    new Formatter().joinVoices([voice2]).format([voice2], 324);
    new Formatter().joinVoices([voice3]).format([voice3], 324);
    new Formatter().joinVoices([voice4]).format([voice4], 324);

    // Create a Beam for the notes
    const beams1 = new Beam(notes.slice(0, 3));
    const beams2 = new Beam(notes2.slice(0, 3));
    const beams3 = new Beam(notes4.slice(1, 3));

    // Render voice
    voice.draw(context, stave);
    voice2.draw(context, stave2);
    voice3.draw(context, stave3);
    voice4.draw(context, stave4);

    beams1.setContext(context).draw();
    beams2.setContext(context).draw();
    beams3.setContext(context).draw();

    // Add a slur above the notes
    const slur1 = new Curve(notes[0], notes[1], { cps: [{ x: 0, y: 5 }, { x: 0, y: 5 }] });
    slur1.setContext(context).draw();

    const slur2 = new Curve(notes2[0], notes2[1], { cps: [{ x: 0, y: 5 }, { x: 0, y: 5 }] });
    slur2.setContext(context).draw();

    const slur3 = new Curve(notes4[1], notes4[2], { cps: [{ x: 0, y: 5 }, { x: 0, y: 5 }] });
    slur3.setContext(context).draw();

    const slur4 = new Curve(notes4[3], notes4[4], { cps: [{ x: 0, y: 10 }, { x: 0, y: 10 }] });
    slur4.setContext(context).draw();


    // Measure 5 - 8
    const div2 = document.getElementById('score4') as HTMLCanvasElement;
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

    const notes5 = [
      new StaveNote({
        keys: ['c/5'],
        duration: '8d',
        auto_stem: true,
      }).addModifier(new Dot()),
      new StaveNote({
        keys: ['d/5'],
        duration: '16',
        auto_stem: true,
      }),
      new StaveNote({
        keys: ['c/5'],
        duration: '8',
        auto_stem: true,
      }),
      new StaveNote({
        keys: ['e/5'],
        duration: 'q',
        auto_stem: true,
      }),
      new StaveNote({
        keys: ['e/5'],
        duration: '8',
        auto_stem: true,
      }),
    ];

    const notes6 = [
      new StaveNote({
        keys: ['b/4'],
        duration: '8d',
        auto_stem: true,
      }).addModifier(new Dot()),
      new StaveNote({
        keys: ['c/5'],
        duration: '16',
        auto_stem: true,
      }),
      new StaveNote({
        keys: ['b/4'],
        duration: '8',
        auto_stem: true,
      }),
      new StaveNote({
        keys: ['d/5'],
        duration: 'q',
        auto_stem: true,
      }),
      new StaveNote({
        keys: ['d/5'],
        duration: '8',
        auto_stem: true,
      }),
    ];

    const notes7 = [
      new StaveNote({
        keys: ['a/4'],
        duration: 'q',
        auto_stem: true,
      }),
      new StaveNote({
        keys: ['b/4'],
        duration: '8',
        auto_stem: true,
      }),
      new StaveNote({
        keys: ['c/5'],
        duration: 'q',
        auto_stem: true,
      }),
      new StaveNote({
        keys: ['d/5'],
        duration: '8',
        auto_stem: true,
      }),
    ];

    const notes8 = [
      new StaveNote({
        keys: ['c/5'],
        duration: 'q',
        auto_stem: true,
      }),
      new StaveNote({
        keys: ['b/4'],
        duration: '8',
        auto_stem: true,
      }),
      new StaveNote({
        keys: ['a/4'],
        duration: 'q',
        auto_stem: true,
      }),
      new StaveNote({ keys: ['b/4'], duration: '8r', auto_stem: true }),
    ];

    // Create a voice in 3/4 and add above notes
    const voice5 = new Voice({ num_beats: 3, beat_value: 4 });
    voice5.addTickables(notes5);
    const voice6 = new Voice({ num_beats: 3, beat_value: 4 });
    voice6.addTickables(notes6);
    const voice7 = new Voice({ num_beats: 3, beat_value: 4 });
    voice7.addTickables(notes7);
    const voice8 = new Voice({ num_beats: 3, beat_value: 4 });
    voice8.addTickables(notes8);

    // Format and justify the notes
    new Formatter().joinVoices([voice5]).format([voice5], 200);
    new Formatter().joinVoices([voice6]).format([voice6], 324);
    new Formatter().joinVoices([voice7]).format([voice7], 324);
    new Formatter().joinVoices([voice8]).format([voice8], 324);

    // Create a Beam for the notes
    const beams4 = new Beam(notes5.slice(0, 3));
    const beams5 = new Beam(notes6.slice(0, 3));

    // Render voice
    voice5.draw(context2, stave5);
    voice6.draw(context2, stave6);
    voice7.draw(context2, stave7);
    voice8.draw(context2, stave8);

    beams4.setContext(context2).draw();
    beams5.setContext(context2).draw();

    // Add a slur above the notes
    const slur5 = new Curve(notes5[0], notes5[1], { cps: [{ x: 0, y: 5 }, { x: 0, y: 5 }] });
    slur5.setContext(context2).draw();

    const slur6 = new Curve(notes6[0], notes6[1], { cps: [{ x: 0, y: 5 }, { x: 0, y: 5 }] });
    slur6.setContext(context2).draw();

    // Add a double barline at the end of the stave
    stave8.setEndBarType(Barline.type.END);
    stave8.draw();
  }

}
