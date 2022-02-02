import SuperInput, {SuperInputTextPropsType} from './SuperInput';
import {Meta, Story} from '@storybook/react';
import {action} from '@storybook/addon-actions';

export default {
    title: 'Todolist/TextInput',
    component: SuperInput,
    argTypes: {
        onChangeText: {
            description: 'callback function - fired when the text changes'
        },
        onEnter: {
            description: 'callback function - fired when pressing enter'
        },
        error: {
            description: 'on error, an error string is sent',
            defaultValue: undefined
        },
        spanClassName: {
            description: 'styles for the field with an error',
            defaultValue: undefined
        }
    }
} as Meta;

const Template: Story<SuperInputTextPropsType> = (args) => <SuperInput {...args}/>

const onChangeTextCallback = action('entered into symbol')
const onEnterCallback = action('pressed enter')

const baseArgs = {
    onChangeText: onChangeTextCallback,
    onEnter: onEnterCallback,
}

export const DefaultInputStory = Template.bind({})

DefaultInputStory.args = {
    ...baseArgs
}