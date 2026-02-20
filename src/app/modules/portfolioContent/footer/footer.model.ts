import { Schema, model } from 'mongoose';
import {
  TContactItem,
  TFooter,
  TQuickLink,
  TSocialLink,
} from './footer.interface';

const socialLinkSchema = new Schema<TSocialLink>(
  {
    faIcon: { type: String, required: true },
    href: { type: String, required: true },
    label: { type: String, required: true },
    color: { type: String, required: true },
  },
  { _id: false },
);

const quickLinkSchema = new Schema<TQuickLink>(
  {
    name: { type: String, required: true },
    href: { type: String, required: true },
  },
  { _id: false },
);

const contactItemSchema = new Schema<TContactItem>(
  {
    label: { type: String, required: true },
    value: { type: String, required: true },
    icon: { type: String, required: true },
    href: { type: String },
  },
  { _id: false },
);

const footerSchema = new Schema<TFooter>(
  {
    type: { type: String, required: true },
    logo: { type: String, required: true },
    description: { type: String, required: true },
    socialLinks: [socialLinkSchema],
    linksTitle: { type: String, required: true },
    linksTitleIcon: { type: String },
    quickLinks: [quickLinkSchema],
    contactTitle: { type: String, required: true },
    contactTitleIcon: { type: String },
    contactItems: [contactItemSchema],
    craftedBy: { type: String, required: true },
    copyrightText: { type: String, required: true },
    slNumber: { type: Schema.Types.Mixed },
  },
  {
    timestamps: true,
  },
);

export const Footer = model<TFooter>('Footer', footerSchema);
