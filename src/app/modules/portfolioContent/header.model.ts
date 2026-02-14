import { Schema, model } from 'mongoose';
import { THeader, THeaderButton, TNavLink } from './header.interface';

const headerButtonSchema = new Schema<THeaderButton>(
  {
    icon: { type: String, required: true },
    link: { type: String, required: true },
    text: { type: String, required: true },
  },
  { _id: false },
);

const navLinkSchema = new Schema<TNavLink>(
  {
    label: { type: String, required: true },
    link: { type: String, required: true },
  },
  { _id: false },
);

const headerSchema = new Schema<THeader>(
  {
    type: { type: String, required: true, enum: ['header'] },
    logo: { type: String, required: true },
    logoAlt: { type: String, required: true },
    logoHeight: { type: Number, required: true },
    logoWidth: { type: Number, required: true },
    navLinks: { type: [navLinkSchema], required: true },
    buttons: {
      primary: { type: headerButtonSchema, required: true },
      secondary: { type: headerButtonSchema, required: true },
    },
  },
  {
    timestamps: true,
  },
);

export const Header = model<THeader>('Header', headerSchema);
