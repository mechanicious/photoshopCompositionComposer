# photoshopCompositionComposer
This script will create unique compositions out of members contained within the top-level document groups, and save them into a desired location both as a `png`- and a `psd`-file.

## Usage
1. See the Example and the Preview below to learn how it works
2. Download and unzip `photoshopCompositionComposer` `jsx`-file
3. Open your project and navigate to `File > Scripts > Browse...`
4. Browse and load the downloaded `jsx` file

## Example
**Layers**
 * `Group` animals.
  * `Layer` dog_
  * `Group` cat_
 * `Group` background.
  * `Layer` sea_
  * `Group` space_
  * `Layer` underWater_

![](https://raw.githubusercontent.com/mechanicious/photoshopCompositionComposer/gh-pages/layersConfiguration-v0.1.png)


**Resulting Compositions**

1. animals.dog_background.sea_
2. animals.dog_background.space_
3. animals.dog_background.underWater_
4. animals.cat_background.sea_
5. animals.cat_background.space_
6. animals.cat_background.underWater_

## Preview
![](https://raw.githubusercontent.com/mechanicious/photoshopCompositionComposer/gh-pages/saveAllCombinations-v0.1.gif)
