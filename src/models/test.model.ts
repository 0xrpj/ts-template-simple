import { model, Schema, Document } from 'mongoose';

const testSchema: Schema = new Schema(
  {
    test: {
      type: String,
      required: true,
    },
    test2: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const test = model<Document>('Test', testSchema);

export default test;
