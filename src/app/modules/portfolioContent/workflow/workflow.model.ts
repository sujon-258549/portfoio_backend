import { Schema, model } from 'mongoose';
import { TWorkflow, TWorkflowStep } from './workflow.interface';

const workflowStepSchema = new Schema<TWorkflowStep>(
  {
    id: { type: String, required: true },
    stepNumber: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    image: { type: String },
  },
  { _id: false },
);

const workflowSchema = new Schema<TWorkflow>(
  {
    badge: { type: String, required: true },
    badgeIcon: { type: String, required: true },
    title: { type: String, required: true },
    titleHighlight: { type: String, required: true },
    description: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    steps: { type: [workflowStepSchema], required: true },
    type: { type: String, required: true, unique: true, default: 'workflow' },
    slNumber: { type: Schema.Types.Mixed },
  },
  {
    timestamps: true,
  },
);

export const Workflow = model<TWorkflow>('Workflow', workflowSchema);
