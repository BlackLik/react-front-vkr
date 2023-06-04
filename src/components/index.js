import { lazy } from 'react';
import { SEO as Seo } from './SEO';
const RussianMap = lazy(() => import('./RussianMap'));

export { Seo, RussianMap };
