export const mockArticle = `
<p>
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque ab neque
  ex ipsam excepturi nemo autem, voluptatum repellendus! Voluptates deserunt ex
  cupiditate minus quasi ipsa blanditiis facere quas consequatur illo.
</p>
<pre>
<code>
#[derive(Debug)]
pub enum State {
    Start,
    Transient,
    Closed,
}

impl From for State {
    fn from(s: a str) -> Self {
        match s {
            "start" => State::Start,
            "closed" => State::Closed,
            _ => unreachable!(),
        }
    }
}
</code>
</pre>
<label>Some footer for this image</label>
<img src="https://picsum.photos/1000/1000" loading="lazy" />
<label>Some footer for this image</label>
<p>
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque ab neque
  ex ipsam excepturi nemo autem, voluptatum repellendus! Voluptates deserunt ex
  cupiditate minus quasi ipsa blanditiis facere quas consequatur illo.
</p>
<img src="https://picsum.photos/1000/1000" loading="lazy" />
<label>Some footer for this image</label>
<p>
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque ab neque
  ex ipsam excepturi nemo autem, voluptatum repellendus! Voluptates deserunt ex
  cupiditate minus quasi ipsa blanditiis facere quas consequatur illo.
</p>
<pre>
<code>
class MyClass {
  public static myValue: string;
  constructor(init: string) {
    this.myValue = init;
  }
}
import fs = require("fs");
module MyModule {
  export interface MyInterface extends Other {
    myProperty: any;
  }
}
declare magicNumber number;
myArray.forEach(() => { }); // fat arrow syntax
</code>
</pre>
<label>Some footer for this image</label>
<p>
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque ab neque
  ex ipsam excepturi nemo autem, voluptatum repellendus! Voluptates deserunt ex
  cupiditate minus quasi ipsa blanditiis facere quas consequatur illo.
</p>
<p>
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque ab neque
  ex ipsam excepturi nemo autem, voluptatum repellendus! Voluptates deserunt ex
  cupiditate minus quasi ipsa blanditiis facere quas consequatur illo.
</p>
`.replace(/<'/g, '&lt;&#039;');
