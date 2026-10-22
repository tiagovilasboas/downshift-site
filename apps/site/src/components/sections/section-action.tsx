import { DsChat } from './ds-chat';

export function SectionAction() {
  return (
    <section id="action">
      <div className="w">
        <div className="hd">
          <h2 className="h2x">See Downshift in action</h2>
          <p className="bd">
            Pick a task to see the decision, or type your own to build the command and run it in
            your terminal.
          </p>
          <p className="sm">
            Real decisions from the CLI on 2026-10-19, assuming claude-opus-5-5 as the current
            model. ~75% and ~50% are the price gap of one model swap at list price, not a saving on
            a session. This page builds the command; it does not run the classifier.
          </p>
        </div>

        <DsChat />
      </div>
    </section>
  );
}
