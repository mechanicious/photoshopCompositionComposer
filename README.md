### photoshopCompositionComposer
This script will create unique compositions out of members contained within the top-level document groups, and save them into a desired location both as a `png`- and a `psd`-file.

#### Example
**Layers**
 * `Group` animals.
  * `Layer` dog_
  * `Group` cat_
 * `Group` background.
  * `Layer` sea_
  * `Group` space_
  * `Layer` underWater_


**Resulting Compositions**

1. animals.dog_background.sea_
2. animals.dog_background.space_
3. animals.dog_background.underWater_
4. animals.cat_background.sea_
5. animals.cat_background.space_
6. animals.cat_background.underWater_
