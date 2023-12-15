import Container from '@mui/material/Container';

import TaskForm from 'src/sections/taches/components/form/TaskForm'

export default function TestView() {

    const handleClose = () => {
        console.log('hi');
    };
    const onSave = () => {
        console.log('hi');
    }
    return (
        <Container>
            <p>
                 view
            </p>
            <TaskForm open handleClose={handleClose} onSave={onSave} />
        </Container>
    );
}