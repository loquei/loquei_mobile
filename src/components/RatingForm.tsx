import React from 'react';
import { VStack, HStack, Pressable, Text } from '@gluestack-ui/themed';
import { useForm, Controller } from 'react-hook-form';
import { Star } from 'lucide-react-native';
import { Textarea } from './Textarea';
import { postRating } from '../api/postRating';
import { IPostRating } from '../@types/TRating';
import { gluestackUIConfig } from '../../config/gluestack-ui.config';
import { createRatingSchema } from '../schemas/CreateRatingSchema';
import * as y from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface RatingFormProps {
  itemId: string;
  raterId: string;
  onSubmitSuccess: () => void;
  onSubmitExternal?: (submitFn: () => void) => void;
}

export function RatingForm({ itemId, raterId, onSubmitSuccess, onSubmitExternal }: RatingFormProps) {
  type CreateRatingSchema = y.InferType<typeof createRatingSchema>;
  const { tokens } = gluestackUIConfig;

  const { control, handleSubmit, reset, formState: { errors } } = useForm<CreateRatingSchema>({
    resolver: yupResolver(createRatingSchema),
    defaultValues: {
      score: 0,
      description: '',
    },
  });

  const onSubmit = async (data: CreateRatingSchema) => {
    const ratingData: IPostRating = {
      rater_id: raterId,
      description: data.description,
      score: data.score,
      item_id: itemId,
    };

    try {
      await postRating(ratingData);
      reset();
      onSubmitSuccess();
    } catch (error) {
      console.log("Erro ao enviar avaliação:", error);
    }
  };

  onSubmitExternal?.(() => handleSubmit(onSubmit)());

  return (
    <VStack gap={12}>
      <Text size="sm" color="$textDark500">
        Deixe seu comentário
      </Text>
      <Controller
        name="description"
        control={control}
        render={({ field: { value, onChange } }) => (
          <>
            <Textarea
              placeholder="Digite seu comentário"
              value={value}
              onChangeText={onChange}
              errorMessage={errors.description?.message}
            />
          </>
        )}
      />

      <Text size="sm" color="$textDark500">
        Sua avaliação:
      </Text>
      <Controller
        name="score"
        control={control}
        render={({ field: { value, onChange } }) => (
          <>
            <HStack justifyContent="space-between">
              {[1, 2, 3, 4, 5].map((ratingValue) => (
                <Pressable key={ratingValue} onPress={() => onChange(ratingValue)}>
                  <Star
                    size={40}
                    color={
                      errors.score
                        ? tokens.colors.red500
                        : (ratingValue <= value ? tokens.colors.yellow500 : tokens.colors.secondary200)
                    }
                    fill={ratingValue <= value ? tokens.colors.yellow500 : 'none'}
                    strokeWidth={1}
                  />
                </Pressable>
              ))}
            </HStack>
            {errors.score && (
              <Text size="sm" color="red">
                {errors.score.message}
              </Text>
            )}
          </>
        )}
      />
    </VStack>
  );
}
