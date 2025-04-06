import { useState } from 'react';
import Bubble from './bubble';
import { Button } from './ui/button';
import { Input } from './ui/input';

type TimedBubble = {
  id: number;
  bubble: React.JSX.Element;
};

export default function GreetForm() {
  const [bubbles, setBubbles] = useState<TimedBubble[]>([]);

  const addBubble = (greeting: string) => {
    const id = Date.now();
    setBubbles(prev => [
      ...prev,
      {
        id,
        bubble: (
          <Bubble
            key={id}
            text={greeting}
            onComplete={() => {
              removeBubble(id);
            }}
          />
        ),
      },
    ]);
  };

  const removeBubble = (id: number) => {
    setBubbles(prev => prev.filter(tb => tb.id !== id));
  };

  const submitAction = (formData: FormData) => {
    console.warn('Submit action not implemented', formData);
    addBubble('not implemented');
    // TODO: Implement submit action
  };

  return (
    <div className="flex flex-col items-center gap-5 rounded-xl bg-[#522785] p-10 text-xl text-white">
      <div>Hello stranger, what&apos;s your name?</div>
      <form className="flex w-full flex-col gap-2" action={submitAction}>
        <Input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full text-center text-lg"
          data-1p-ignore
        />
        <Button
          type="submit"
          className="w-full bg-white/50 text-lg text-[#522785]"
          size={'lg'}
        >
          Greet
        </Button>
      </form>
      {bubbles.map(tb => tb.bubble)}
    </div>
  );
}
