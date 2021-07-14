import { App } from './App';
import { configure, shallow } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() })

describe('App', () => {
  it('should render properly', () => {
    const AppShallow = shallow(<App />)
  })
})
