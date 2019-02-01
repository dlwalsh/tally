import { useState } from "react";
import { assoc, lensPath, map, not, over, pipe, reduce, set, values } from "ramda";
import { slug } from "../utils/slug";

const annotateInitialState = pipe(
  map(assoc("party", "")),
  map(d => assoc("id", slug(d.name), d)),
  reduce(
    (record, d) => assoc(d.id, d, record),
    {},
  ),
);

const setParty = (id, party) => set(
  lensPath([id, "party"]),
  party,
);

const toggleFeatured = id => over(
  lensPath([id, "featured"]),
  not,
);

export function useDistricts(rawInitialState) {
  const initialState = annotateInitialState(rawInitialState);
  const [state, setState] = useState(initialState);

  return {
    districts: values(state),
    onPartyChange(id, party) {
      setState(setParty(id, party));
    },
    onToggleFeatured(id) {
      setState(toggleFeatured(id));
    },
  };
}
