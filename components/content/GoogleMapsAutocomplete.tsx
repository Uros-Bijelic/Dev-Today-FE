'use client';

import {
  AdvancedMarker,
  ControlPosition,
  Map,
  MapControl,
  Pin,
  useMap,
  useMapsLibrary,
} from '@vis.gl/react-google-maps';
import { CalendarIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useCallback, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';

// ----------------------------------------------------------------

interface IGoogleMapAutocompleteProps {
  onChange: (...event: any[]) => void;
}
const GoogleMapsAutocomplete: React.FC<IGoogleMapAutocompleteProps> = ({
  onChange,
}) => {
  const { getValues } = useFormContext();
  const location = getValues('meetupLocation');

  const { resolvedTheme } = useTheme();
  const map = useMap();
  const places = useMapsLibrary('places');
  const [zoom, setZoom] = useState(location.address ? 16 : 3);
  const center = {
    lat: location.lat || 22.54992,
    lng: location.lng || 0,
  };
  const [coordinates, setCoordinates] = useState({
    lat: location.lat || 22.54992,
    lng: location.lng || 0,
  });
  const [address, setAddress] = useState<null | string>(location.address);

  const [selectedPlace, setSelectedPlace] = useState<any | null>(null);

  // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompleteSessionToken
  const [sessionToken, setSessionToken] = useState<any>();

  // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service
  const [autocompleteService, setAutocompleteService] = useState<any | null>(
    null
  );

  // https://developers.google.com/maps/documentation/javascript/reference/places-service
  const [placesService, setPlacesService] = useState<any | null>(null);

  const [predictionResults, setPredictionResults] = useState<any[]>([]);

  const [inputValue, setInputValue] = useState<string>('');

  const darkLightMode =
    resolvedTheme === 'dark' ? '7a9e2ebecd32a903' : '3fec513989decfcd';

  useEffect(() => {
    if (!places || !map) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAutocompleteService(new places.AutocompleteService());
    setPlacesService(new places.PlacesService(map));
    setSessionToken(new places.AutocompleteSessionToken());

    return () => setAutocompleteService(null);
  }, [map, places]);

  const fetchPredictions = useCallback(
    async (inputValue: string) => {
      if (!autocompleteService || !inputValue) {
        setPredictionResults([]);
        return;
      }

      const request = { input: inputValue, sessionToken };
      const response = await autocompleteService.getPlacePredictions(request);

      setPredictionResults(response.predictions);
    },
    [autocompleteService, sessionToken]
  );

  const onInputChange = useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      const value = (event.target as HTMLInputElement)?.value;

      setInputValue(value);
      fetchPredictions(value);
    },
    [fetchPredictions]
  );

  const handleSuggestionClick = useCallback(
    (placeId: string) => {
      if (!places) return;

      const detailRequestOptions = {
        placeId,
        fields: ['geometry', 'name', 'formatted_address'],
        sessionToken,
      };

      const detailsRequestCallback = (placeDetails: any) => {
        setSelectedPlace(placeDetails);
        setPredictionResults([]);
        setInputValue(placeDetails?.formatted_address ?? '');
        setSessionToken(new places.AutocompleteSessionToken());
      };

      placesService?.getDetails(detailRequestOptions, detailsRequestCallback);
    },
    [setSelectedPlace, places, placesService, sessionToken]
  );

  useEffect(() => {
    if (!map || !selectedPlace) return;

    if (selectedPlace.geometry?.viewport) {
      map.fitBounds(selectedPlace.geometry?.viewport);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCoordinates({
        lat: selectedPlace.geometry?.location?.lat() as number,
        lng: selectedPlace.geometry?.location?.lng() as number,
      });
      setAddress(selectedPlace.formatted_address as string);
      setZoom(16);
      onChange({
        address: selectedPlace.formatted_address as string,
        lat: selectedPlace.geometry?.location?.lat() as number,
        lng: selectedPlace.geometry?.location?.lng() as number,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, selectedPlace]);

  return (
    <div className="h-80">
      <Map
        key={resolvedTheme}
        style={{ width: '100%', height: '100%' }}
        defaultCenter={center}
        defaultZoom={zoom}
        zoom={zoom}
        gestureHandling="cooperative"
        disableDefaultUI
        mapTypeId="roadmap"
        mapId={darkLightMode}
        reuseMaps
      >
        <MapControl position={ControlPosition.RIGHT_BOTTOM}>
          <div className="mr-2 mb-1 flex flex-col gap-y-1">
            <Button
              className="p1-medium border-white-border bg-white-100 text-black-700 hover:bg-primary-500 hover:text-white-200 dark:border-black-800 dark:bg-black-700 dark:text-white-200 hover:dark:bg-primary-500 rounded border px-3 py-0.5 transition duration-300 ease-in-out"
              type="button"
              onClick={() => setZoom((prevZoom) => prevZoom + 1)}
            >
              +
            </Button>
            <Button
              type="button"
              className="p1-medium border-white-border bg-white-100 text-black-700 hover:bg-primary-500 hover:text-white-200 dark:border-black-800 dark:bg-black-700 dark:text-white-200 hover:dark:bg-primary-500 rounded border px-3 py-0.5 transition duration-300 ease-in-out"
              onClick={() => setZoom((prevZoom) => prevZoom - 1)}
            >
              -
            </Button>
          </div>
        </MapControl>
        <MapControl position={ControlPosition.TOP_LEFT}>
          <div className="absolute top-4 left-4">
            <input
              value={inputValue}
              onInput={(event: React.FormEvent<HTMLInputElement>) =>
                onInputChange(event)
              }
              placeholder="Search for a place"
              className="p3-medium dark:border-dark-border border-white-border bg-white-100 text-black-700 placeholder:text-white-400 dark:bg-black-800 dark:text-white-100 min-w-[275px] rounded border p-1.5"
            />

            {predictionResults.length > 0 && (
              <ul className="bg-white-100 text-black-700 shadow-card dark:bg-black-800">
                {predictionResults.map(({ place_id, description }) => {
                  return (
                    <li
                      key={place_id}
                      className="p3-medium hover:bg-white-300 dark:hover:text-black-800 flex cursor-pointer gap-2 px-2 py-1 transition-colors duration-100"
                      onClick={() => handleSuggestionClick(place_id)}
                    >
                      {description}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </MapControl>
        {address && (
          <AdvancedMarker
            position={{ lat: coordinates.lat, lng: coordinates.lng }}
          >
            <Pin background="#825EF6" borderColor="#825EF6" scale={1.4}>
              <CalendarIcon className="text-white-200" />
            </Pin>
          </AdvancedMarker>
        )}
      </Map>
    </div>
  );
};

export default GoogleMapsAutocomplete;
