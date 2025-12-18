export interface ButtonComponentProps {
    type: 'primary' | 'secondary';
    title: string;
    action: ()=> void
}