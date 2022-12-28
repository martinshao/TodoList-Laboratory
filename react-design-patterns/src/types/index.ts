type Data = {
  aaa?: number;
  bbb: {
    ccc: number;
    ddd: string;
    [key: string]: any;
  };
  eee: {
    ccc: {
      fff: number;
    };
  };
};

type Col = {
  a: number;
  b: number;
} & Record<string, any>;

type DeepRecord<Obj extends Record<string, any>> = {
  [Key in keyof Obj]: Obj[Key] extends Record<string, any>
    ? DeepRecord<Obj[Key]> & Record<string, any>
    : Obj[Key];
} & Record<string, any>;

export type { Data, Col, DeepRecord };
