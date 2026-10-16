export type Finding = { code:string; title:string; severity:'critical'|'high'|'medium'|'low'; detail:string; recommendation:string };
export type LandCase = { id:string; title:string; district:string; upazila:string; mouza:string; dagNo:string; khatianNo:string; deed:{owner:string; areaDecimal:number; deedNo:string; date:string}; khatian:{owner:string; areaDecimal:number; dagNo:string; khatianNo:string}; mutation:{owner:string; status:string; date:string}; expectedRisk?:string };
export const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';
