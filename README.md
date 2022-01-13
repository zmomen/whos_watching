# whos_watching
GO project with a react UI to track tv shows and movies that we are watching


def remove_dups(nums):
    cur = 0
    for i in range(1, len(nums)):
        if nums[i] == nums[cur]:
            continue
        elif nums[i] > nums[cur]:
            nums[cur + 1] = nums[i]
            cur += 1
    return cur + 1


input_arr = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4]
print(remove_dups(input_arr), input_arr[:remove_dups(input_arr)])


def solution(prices):
    profit = 0
    for i in range(0, len(prices) - 1):
        if (-1 * prices[i]) + prices[i + 1] > 0:
            profit += (-1 * prices[i]) + prices[i + 1]
    return profit


input_arr = [4, 5, 6, 1, 8]
# input_arr = [4,5,6,1,8]
print(solution(input_arr))


def buy_stock(nums):
    profit = 0
    # hash of sums by 2nd number position
    hash = {}
    for i in range(2, len(nums)):
        for j in range(i + 1, len(nums)):
            calc = (-1 * nums[i]) + nums[j]
            if calc > 0:
                hash.setdefault(i - 1, []).append(calc)
                if profit < calc:
                    profit = calc
    print(hash)

    for x in range(0, len(nums) - 1):
        for y in range(1, len(nums)):
            two_nums = (-1 * nums[x]) + nums[y]
            print((-1 * nums[x]), nums[y], two_nums, "y", y)
            if profit < two_nums:
                profit = two_nums
            if y in hash:
                for iter in hash[y]:
                    print("iter", y, two_nums + iter)
                    if profit < two_nums + iter:
                        profit = two_nums + iter

    return profit


input_arr = [7, 1, 5, 3, 6, 4]
# input_arr = [4,5,6,1,8]
# print(buy_stock(input_arr))




def rotate(nums, k):
    for i in range(len(nums), len(nums) - k , -1):
        nums.insert(0, nums.pop())

input_arr = [1, 2, 3, 4, 5, 6 ,7]
# input_arr = [-1,-100,3,99]
print("input", input_arr, "k =", 2)
rotate(input_arr, 2)
print("final", input_arr)




def conatains_dup(nums):
    if len(nums) < 2:
        return False

    nums.sort()

    for i in range(0, len(nums)-1):
        if nums[i] == nums[i+1]:
            return True

    return False


input_arr = [3,1]
print(conataines_dup(input_arr))




def single_number(nums):
    nums.sort()
    total = nums[0]
    for i in range(1, len(nums)):
        if i % 2 == 0:
            total += nums[i]
        else:
            total -= nums[i]
    return total


input_arr = [4, 1, 2, 1, 2]
# input_arr = [6, 3, 1, 6, 3]
print(single_number(input_arr))



# def slow_implementation(nums):
    # found = nums[0]
    # pos = 0
    #
    # i = 1
    # while i < len(nums):
    #     if nums[pos] != nums[i]:
    #         i += 1
    #         continue
    #     elif nums[pos] == nums[i]:
    #         temp = nums[pos + 1]
    #         nums[pos + 1] = nums[i]
    #         nums[i] = temp
    #         pos += 2
    #         i = pos + 1
    #         found = nums[pos]
    # return found




def intersect_two_arr(nums1, nums2):
    dic = {}
    output = []
    for i in range(0, len(nums1)):
        if nums1[i] in dic:
            dic[nums1[i]] += 1
        else:
            dic[nums1[i]] = 1

    for j in range(0, len(nums2)):
        if nums2[j] in dic:
            dic[nums2[j]] -= 1
            if dic[nums2[j]] < 0:
                dic.pop(nums2[j])
            else:
                output.append(nums2[j])

    # print(dic)
    return output

nums1 = [4,9,5]
nums2 = [9,4,9,8,4]
nums1 = [1, 2, 2, 1]
nums2 = [2, 2]
print(intersect_two_arr(nums1, nums2))


# slow implementation
#
# def intersect_two_arr(nums1, nums2):
#     output = []
#     arr2_last = len(nums1) - 1
#
#     for i in range(0, len(nums1)):
#         # print("at i",i, nums1[i])
#         j = 0
#         while j <= arr2_last:
#             if nums1[i] == nums2[j]:
#                 # add to output
#                 output.append(nums1[i])
#
#                 # swap with last
#                 temp = nums2[j]
#                 nums2[j] = nums2[arr2_last]
#                 nums2[arr2_last] = temp
#
#                 # reduce last_pos
#                 arr2_last -= 1
#                 # print("found at j last pos", j, arr2_last, nums1[i], nums2[j])
#
#                 break
#             else:
#                 j += 1
#
#     return output



def plus_one(digits):

    # 1 element array
    if len(digits) == 1:
        return [digits[0] + 1] if digits[0] < 9 else [1, 0]
    else:
        x = len(digits) - 1
        carry = 0

        # if easy operation
        if digits[x] < 9:
            digits[x] += 1
            return digits

        # everything else
        else:
            digits[x] = 0
            x -= 1
            carry = 1
            # start backwards
            while carry != 0 and x >= 0:
                if digits[x] == 9:
                    digits[x] = 0
                    x -= 1
                else:
                    digits[x] += 1
                    carry = 0

    if digits[0] == 0:
        digits = [0] * (len(digits)+1)
        digits[0] = 1

    return digits


input_arr = [9,9]
print(plus_one(input_arr))


# METHOD.
# if one element and a 9, then return [1,0]
# else more than one element
# and if operation is easy (meaning, the last element in array is less than 9 then increment and return.
# else loop starting backwads
# check if element is a 9, then set to zero,
# else if not a nine, increment by one.
# finally, if the first element is now a zero, then create a new array of zeroes, with an extra element and set the first element to 1.




def move_zeroes(nums):
    seen = 0
    for i in range(len(nums)):
        if nums[i] == 0:
            seen += 1
        else:
            temp = nums[i]
            nums[i] = nums[i - seen]
            nums[i - seen] = temp


input_arr = [0, 1, 0, 3, 12]
print(move_zeroes(input_arr))


# METHOD.
# keep track of how many zeroes seen.
# go through a loop, each time you see a zero, increase counter
# if not zero, then swap that number with the number at position current minus however many zeroes seen so far (the position of next zero in the array)




def two_sum(nums, target):
    for i in range(0, len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]


input_arr = [3, 3]
tag = 6
print(two_sum(input_arr, tag))


# METHOD.
# first loop is to take a number
# then, second loop will add first number with every other number remaining.
# if target, then return.
# else keep going through every element and compare to each remaining element.




def rotate_image(matrix):
    output = []
    for i in range(len(matrix)):
        for j in range(len(matrix)):
            output.append(matrix[i][j])

    counter = 0
    last = len(matrix) - 1

    for i in range(len(matrix) * len(matrix)):
        matrix[counter][last] = output[i]
        counter += 1

        if counter % len(matrix) == 0:
            counter = 0
            last -= 1

input_arr = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
input_arr = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
input_arr = [[1,2],[3,4]]

print(rotate_image(input_arr), input_arr)

# METHOD.
# write all elements into one array.
# rewrite elements into the last position then second last, etc.


# METHOD1: use ordered dict to store each element count.
# Then, find first entry with count 1.
#
# METHOD2: improvement: use dictionary to store each element count.
# Then, go through and find minimum index of elements with count 1

