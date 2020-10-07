const Slots = require('./SlotsModel').SlotsModel;

const addSlotsData = (boulderToelz, climbToelz, boulderThalkirchen, climbThalkirchen,
                      boulderGilching, climbGilching, boulderFreimann, climbFreimann) =>
    Slots.create({
        boulderToelz,
        climbToelz,
        boulderThalkirchen,
        climbThalkirchen,
        boulderGilching,
        climbGilching,
        boulderFreimann,
        climbFreimann,
});

const getSlotsData = () => Slots.findAll();

module.exports = {
    addSlotsData,
    getSlotsData,
};
