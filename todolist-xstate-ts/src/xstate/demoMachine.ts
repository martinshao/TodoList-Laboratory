import { createMachine, assign } from 'xstate'

interface Context {
  something: boolean;
}

createMachine({
  schema: {
    context: {} as Context
  },
  context: {
    something: true
  },
  entry: [
    // Type 'AssignAction<{ something: false; }, AnyEventObject>' is not assignable to type 'string'.
    assign(() => {
      return {
        something: false
      };
    }),
    // Type 'AssignAction<{ something: false; }, AnyEventObject>' is not assignable to type 'string'.
    assign({
      something: false
    }),
    // Type 'AssignAction<{ something: false; }, AnyEventObject>' is not assignable to type 'string'.
    assign({
      something: () => false
    })
  ]
});