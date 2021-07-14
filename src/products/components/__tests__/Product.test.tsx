import { act } from 'react-dom/test-utils';
import { configure, shallow, mount } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { Product } from '../Product';
import { MockImagesViewer } from '../../../imagesViewer/__mocks__/MockImagesViewer';
import { imagesViewerFactory } from '../../../imagesViewer/imagesViewerFactory';

configure({ adapter: new Adapter() })

jest.mock('../../../imagesViewer/ImagesViewerFactory', () => ({
  imagesViewerFactory: jest.fn()
}));

const PRODUCT = {
  imageUrls: ['www.image1.com'],
  defaultImageIndex: 0,
  nbImages: 1
}

describe('Product', () => {
  const ProductShallow = shallow(<Product product={PRODUCT} />)

  beforeEach(() => {
    const mockImagesViewer = new MockImagesViewer();
    (imagesViewerFactory as any).mockReturnValue(mockImagesViewer)
  })

  it('should render properly', () => {
    const product = ProductShallow.find(".product")
    expect(product.exists()).toEqual(true)
  })

  it('should render the spinner when there is no images', () => {
    const spin = ProductShallow.find("Spin")
    expect(spin.exists()).toEqual(true)
  })

  it('should pass images and dimensions to displayer', async () => {
    let productMount = mount(<Product product={PRODUCT} />)

    act(() => {
      productMount.update();
    })

    const displayer = productMount?.find('.product').find("KonvaImageDisplayer")

    expect(displayer.exists()).toEqual(true)
    expect(displayer.prop('image')).not.toBeFalsy()
    expect(displayer.prop('dimensions')).not.toBeFalsy()
  })

  describe('previous button', () => {
    let productMount = mount(<Product product={PRODUCT} />)

    it('should not disable previous button when index is greater than 0', () => {
      act(() => {
        productMount.update();
      })

      const previousButton = productMount?.find(".buttons__previous")
      const nextButton = productMount?.find(".buttons__next")

      act(() => {
        nextButton.simulate('click')
        nextButton.update();
      });

      expect(previousButton.exists()).toEqual(true)
      expect(previousButton.prop('disabled')).toEqual(false)
    })

    it('should disable previous button when index is 0', () => {
      act(() => {
        productMount.update();
      })

      const previousButton = productMount.find(".buttons__previous")

      expect(previousButton.exists()).toEqual(true)
      expect(previousButton.prop('disabled')).toEqual(true)
    })
  })

  describe('next button', () => {
    let productMount = mount(<Product product={PRODUCT} />)
    it('should not disable next button when index is lower than max', () => {
      act(() => {
        productMount.update();
      })

      const nextButton = productMount.find(".buttons__next")

      act(() => {
        nextButton.simulate('click')
        nextButton.update();
      });

      expect(nextButton.exists()).toEqual(true)
      expect(nextButton.prop('disabled')).toEqual(false)
    })

    it('should disable next button when index is max', () => {
      act(() => {
        productMount.update();
      })

      const nextButton = productMount.find(".buttons__next")
      expect(nextButton.exists()).toEqual(true)
      expect(nextButton.prop('disabled')).toEqual(true)
    })
  })
})
